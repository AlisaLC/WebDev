import * as dotenv from "dotenv";
import fastify from 'fastify';
import fastifyCookie from "fastify-cookie";
import { Container } from 'inversify';
import { Connection, createConnection } from 'typeorm';
import { routesPlugin } from './api/routes';
import { NoteApplicationServiceImpl } from './application/impl/note-application-service-impl';
import { UserApplicationServiceImpl } from "./application/impl/user-application-service-impl";
import { NoteApplicationService } from './application/note-application-service';
import { UserApplicationService } from "./application/user-application-service";
import { Note, NoteRepository } from './domain/note';
import { User, UserRepository } from './domain/user';
import { authPlugin } from "./infra/plugin/auth";
import { NoteRepositoryImpl } from './infra/repository/note-repository';
import { UserRepositoryImpl } from './infra/repository/user-repository';
import { loadSync } from '@grpc/proto-loader';
import { ServiceClientConstructor, loadPackageDefinition, credentials } from '@grpc/grpc-js';

dotenv.config({ path: '.env' });
createConnection().then(connection => start(connection));

function start(connection: Connection) {
    const stub = getCache();
    const server = fastify({ logger: true, ignoreTrailingSlash: true });
    const container = new Container();
    container.bind('dbNoteRepository').toConstantValue(connection.getRepository(Note))
    container.bind('dbUserRepository').toConstantValue(connection.getRepository(User))
    container.bind(UserRepository).to(UserRepositoryImpl);
    container.bind(NoteRepository).to(NoteRepositoryImpl);
    container.bind(NoteApplicationService).to(NoteApplicationServiceImpl);
    container.bind(UserApplicationService).to(UserApplicationServiceImpl);
    container.bind('cacheStub').toConstantValue(stub);
    server.register(fastifyCookie)
    server.addHook('onRequest', async (req) => {
        req.container = container;
    });
    server.register(authPlugin(server));
    server.register(routesPlugin());
    const port = 8000 || process.env.BACKEND_PORT;
    server.listen(port);
}

function getCache() {
    let packageDefinition = loadSync(
        __dirname + '/../cache.proto',
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    var protoDescriptor = loadPackageDefinition(packageDefinition);
    const cache = protoDescriptor.Cache as ServiceClientConstructor;
    const stub = new cache('localhost:5050', credentials.createInsecure());
    return stub;
}
