import { HookHandlerDoneFunction } from "fastify";
import { FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify";
import { authRoutesPlugin } from "./routes/auth";
import { noteRoutesPlugin } from "./routes/note";

export function routesPlugin() {
    return async (app: FastifyInstance, _options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
        app.register(authRoutesPlugin(), { prefix: 'auth/' });
        app.register(noteRoutesPlugin(), { prefix: 'notes/' });
        done();
    };
}