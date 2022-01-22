import { injectable } from "inversify";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn([{ name: 'ownerId', referencedColumnName: 'id'}])
    owner: User;

    @Column('text')
    text: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}

@injectable()
export abstract class NoteRepository {
    abstract findNoteByID(id: number): Promise<Note>;
    abstract findNotesByUser(user: User): Promise<Note[]>;
    abstract getAll(): Promise<Note[]>;
    abstract save(note: Note): Promise<Note>;
    abstract delete(note: Note): void;
}