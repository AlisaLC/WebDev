import { inject, injectable } from "inversify";
import { ClaimType, Token } from "../../domain/token";
import { User, UserRepository } from "../../domain/user";
import { BadRequestError, ConflictError, UnauthorizedError } from "../error/errors";
import { UserApplicationService } from "../user-application-service";

@injectable()
export class UserApplicationServiceImpl extends UserApplicationService {
    @inject(UserRepository)
    repo: UserRepository;

    async signup(username: string, password: string, isAdmin: boolean): Promise<string> {
        if (isAdmin === undefined || isAdmin === null) isAdmin = false;
        if (!username || !password) throw new BadRequestError('username or password cannot be empty')
        let usernameExists = true;
        try {
            const oldUser = await this.repo.findUserByUsername(username);
        } catch (e) {
            usernameExists = false;
        };
        if (usernameExists) throw new ConflictError('repeated username');
        let user = new User();
        user.username = username;
        user.setPassword(password);
        user.isAdmin = isAdmin;
        user = await this.repo.save(user);
        return Token.create([{ type: ClaimType.UserId, value: user.id.toString() }, { type: ClaimType.IsAdmin, value: user.isAdmin }]).toString();
    }

    async get(id: number): Promise<User> {
        const user = await this.repo.findUserByID(id);
        return user;
    }

    async login(username: string, password: string): Promise<string> {
        const user = await this.repo.findUserByUsername(username);
        if (user.verifyPassword(password)) {
            return Token.create([{ type: ClaimType.UserId, value: user.id.toString() }, { type: ClaimType.IsAdmin, value: user.isAdmin }]).toString();
        }
        throw new UnauthorizedError('incorrect password');
    }

    async logout(user: User): Promise<void> {
        // TODO: if token is saved in cache, expire it
    }
}