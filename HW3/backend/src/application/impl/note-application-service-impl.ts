import { inject, injectable } from "inversify";
import { Note, NoteRepository } from "../../domain/note";
import { User } from "../../domain/user";
import { BadRequestError } from "../error/errors";
import { NoteApplicationService } from "../note-application-service";

@injectable()
export class NoteApplicationServiceImpl extends NoteApplicationService {
    @inject(NoteRepository)
    repo: NoteRepository;

    async create(title: string, text: string, owner: User): Promise<Note> {
        if (!title || !text) throw new BadRequestError('title or text cannot be empty')
        let note = new Note();
        note.createdAt = new Date();
        note.updatedAt = note.createdAt;
        note.title = title;
        note.text = text;
        note.owner = owner;
        note = await this.repo.save(note);
        return note;
    }

    async get(id: number): Promise<Note> {
        const note = await this.repo.findNoteByID(id);
        return note;
    }

    async getAll(): Promise<Note[]> {
        const notes = await this.repo.getAll();
        return notes;
    }

    async getAllUserNotes(user: User): Promise<Note[]> {
        const notes = await this.repo.findNotesByUser(user);
        return notes;
    }

    async update(note: Note, title: string, text: string): Promise<Note> {
        note.title = title;
        note.text = text;
        note.updatedAt = new Date();
        note = await this.repo.save(note);
        return note;
    }

    async delete(note: Note): Promise<Note> {
        this.repo.delete(note);
        return note;
    }

}