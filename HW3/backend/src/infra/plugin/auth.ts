import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from "fastify";
import { UserApplicationService } from "../../application/user-application-service";
import { ClaimType, Token } from "../../domain/token";

export function authPlugin(server: FastifyInstance) {
    return async (app: FastifyInstance, _options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
        server.addHook('onRequest', async (request) => {
            request.identity = { isAuthenticated: false };
            const rawToken = request.cookies.auth;
            if (!rawToken) return;
            const token = Token.from(rawToken);
            if (!token.verify()) return;
            const data = token.decode();
            if (!data) return;
            const service = request.container.get<UserApplicationService>(UserApplicationService);
            const user = await service.get(data[ClaimType.UserId]);
            request.identity.isAuthenticated = true;
            request.identity.user = user;
        });
        done();
    }
}