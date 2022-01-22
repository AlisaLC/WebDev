import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { User, UserRepository } from "../../domain/user";
import { CacheUtil } from "../util/cache-util";

@injectable()
export class UserRepositoryImpl extends UserRepository {
    @inject('dbUserRepository')
    dbRepository: Repository<User>;
    @inject('cacheStub')
    stub: ServiceClient;

    async findUserByID(id: number): Promise<User> {
        const user = await this.dbRepository.findOne(id);
        if (user) return user;
        throw new Error('user not found');
    }
    async findUserByUsername(username: string): Promise<User> {
        let userId: number = -1;
        try {
            userId = await CacheUtil.get(this.stub, username) as number;
        } catch (e) { }
        if (userId === -1) {
            const user = await this.dbRepository.findOne({ username });
            if (!user) throw new Error('user not found');
            await CacheUtil.set(this.stub, username, user.id);
            return user;
        } else {
            const user = await this.dbRepository.findOne(userId);
            if (!user) throw new Error('user not found');
            return user;
        }
    }
    async save(user: User): Promise<User> {
        const userSave = this.dbRepository.save(user);
        await CacheUtil.set(this.stub, user.username, user.id);
        return userSave;
    }

}