import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { NotFoundError } from "../../application/error/errors";
import { Note, NoteRepository } from "../../domain/note";
import { User } from "../../domain/user";
import { CacheUtil } from "../util/cache-util";

@injectable()
export class NoteRepositoryImpl extends NoteRepository {
    @inject('dbNoteRepository')
    dbRepository: Repository<Note>;
    @inject('cacheStub')
    stub: ServiceClient;

    async findNoteByID(id: number): Promise<Note> {
        const note = await this.dbRepository.createQueryBuilder('note').where('note.id = :id', { id }).leftJoinAndSelect('note.owner', 'user').getOne();
        if (note) return note;
        throw new NotFoundError('note not found');
    }

    async findNotesByUser(user: User): Promise<Note[]> {
        let idConcat: string = '', noteIds: number[] = [];
        try {
            idConcat = await CacheUtil.get(this.stub, user.id) as string;
            if (idConcat === '-1') throw new Error('out of cache');
            noteIds = idConcat.split('|').map(e => Number(e));
        } catch (e) { }
        if (noteIds.length > 0) {
            const notes = await this.dbRepository.createQueryBuilder('note').where('note.id IN (:...ids)', { ids: noteIds }).leftJoinAndSelect('note.owner', 'user').getMany();
            return notes;
        }
        const notes = await this.dbRepository.createQueryBuilder('note').where('note.owner = :id', { id: user.id }).leftJoinAndSelect('note.owner', 'user').getMany();
        if (notes.length < 200) {
            await CacheUtil.set(this.stub, user.id, notes.map(e => e.id).join('|'));
        } else {
            await CacheUtil.set(this.stub, user.id, '-1');
        }
        return notes;
    }

    async getAll(): Promise<Note[]> {
        const notes = await this.dbRepository.createQueryBuilder('note').leftJoinAndSelect('note.owner', 'user').getMany();
        return notes;
    }

    async save(note: Note): Promise<Note> {
        const noteSave = await this.dbRepository.save(note);
        let idConcat: string = '-1';
        try {
            idConcat = await CacheUtil.get(this.stub, note.owner.id) as string;
        } catch (e) { }
        if (idConcat === '-1') return noteSave;
        if (idConcat.length + String(note.id).length < 2047) {
            await CacheUtil.set(this.stub, note.owner.id, idConcat + '|' + note.id);
        } else {
            await CacheUtil.set(this.stub, note.owner.id, '-1');
        }
        return noteSave;
    }

    async delete(note: Note): Promise<void> {
        let idConcat: string = '-1';
        try {
            idConcat = await CacheUtil.get(this.stub, note.owner.id) as string;
        } catch (e) { }
        if (idConcat === '-1') return;
        const noteIds = new Set(idConcat.split('|').map(e => Number(e)));
        noteIds.delete(note.id);
        idConcat = '';
        for (let noteId of noteIds) {
            idConcat += noteId + '|';
        }
        if (idConcat.length > 0) {
            idConcat = idConcat.slice(0, -1);
        } else {
            idConcat = '-1';
        }
        await CacheUtil.set(this.stub, note.owner.id, idConcat)
        await this.dbRepository.delete(note);
    }
}