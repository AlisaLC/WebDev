import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from "fastify";
import { TooManyRequestsError } from "../../application/error/errors";
import { CacheUtil } from "../util/cache-util";

export function rateLimiterPlugin(server: FastifyInstance) {
    return async (app: FastifyInstance, _options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
        server.addHook('onRequest', async (request, reply) => {
            const quota: number = +(process.env.X_QUOTA || 30)
            reply.header('x-quota', quota);
            const stub = request.container.get<ServiceClient>('cacheStub');
            let lastAccess: Date = new Date();
            let accessCount: number = 0;
            try {
                lastAccess = new Date(await CacheUtil.get(stub, request.ip + '-la') as string);
                accessCount = await CacheUtil.get(stub, request.ip + '-ac') as number;
            } catch (e) { }
            const diff: number = (new Date().getTime() - lastAccess.getTime()) / 1000
            const timePerQuota: number = Math.floor((60 * 60) / quota)
            accessCount = Math.max(accessCount - Math.floor(diff / timePerQuota) + 1, 1)
            await CacheUtil.set(stub, request.ip + '-ac', accessCount <= quota ? accessCount : quota);
            reply.header('x-remaining-request', Math.max(quota - accessCount, 0))
            await CacheUtil.set(stub, request.ip + '-la', new Date().toISOString());
        });
        server.addHook('onRequest', async (request, reply) => {
            if (reply.getHeader('x-remaining-request') == '0') {
                throw new TooManyRequestsError('too many requests to handle');
            }
        })
        done();
    }
}