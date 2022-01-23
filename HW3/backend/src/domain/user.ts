import sha256 from "fast-sha256";
import { injectable } from "inversify";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import nacl from 'tweetnacl-util';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    username: string;

    @Column({ length: 32 })
    password: string;

    @Column()
    isAdmin: boolean;

    private hashPassword(password: string) {
        return nacl.encodeBase64(sha256(nacl.decodeUTF8(password))).substring(0, 32);
    }

    setPassword(password: string) {
        this.password = this.hashPassword(password);
    }

    verifyPassword(password: string) {
        return this.password === this.hashPassword(password);
    }
}

@injectable()
export abstract class UserRepository {
    abstract findUserByID(id: number): Promise<User>;
    abstract findUserByUsername(username: string): Promise<User>;
    abstract save(user: User): Promise<User>;
}