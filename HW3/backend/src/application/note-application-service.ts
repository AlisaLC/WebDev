import { injectable } from 'inversify'
import { Note } from './../domain/note'
import { User } from './../domain/user'

@injectable()
export abstract class NoteApplicationService {
    abstract create(title: string, text: string, owner: User): Promise<Note>;
    abstract get(id: number): Promise<Note>;
    abstract getAll(): Promise<Note[]>;
    abstract getAllUserNotes(user: User): Promise<Note[]>;
    abstract update(note: Note, title: string, text: string): Promise<Note>;
    abstract delete(note: Note): Promise<Note>;
}