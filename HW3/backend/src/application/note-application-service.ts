import { injectable } from 'inversify'
import { Note } from './../domain/note'
import { User } from './../domain/user'

@injectable()
export abstract class NoteApplicationService {
    abstract create(text: string, owner: User): Promise<Note>;
    abstract get(id: number): Promise<Note>;
    abstract getAll(): Promise<Note[]>;
    abstract getAllUserNotes(user: User): Promise<Note[]>;
    abstract update(note: Note, text: string): Promise<Note>;
    abstract delete(note: Note): Promise<Note>;
}