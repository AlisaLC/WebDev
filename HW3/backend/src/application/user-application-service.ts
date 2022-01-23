import { injectable } from 'inversify'
import { User } from './../domain/user'

@injectable()
export abstract class UserApplicationService {
    abstract signup(username: string, password: string, isAdmin: boolean): Promise<string>;
    abstract get(id: number): Promise<User>;
    abstract login(username: string, password: string): Promise<string>;
    abstract logout(user: User): Promise<void>;
}