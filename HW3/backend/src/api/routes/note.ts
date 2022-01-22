import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from "fastify";
import { AccessForbiddenError, UnauthorizedError } from "../../application/error/errors";
import { NoteApplicationService } from "../../application/note-application-service";

export function noteRoutesPlugin() {
    return async (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
        app.get('/', async (request, reply) => {
            if (!request.identity || !request.identity.isAuthenticated || !request.identity.user) {
                throw new UnauthorizedError("identity invalid!");
            }
            const service = request.container.get<NoteApplicationService>(NoteApplicationService);
            let notes;
            if (request.identity.user.isAdmin) {
                notes = await service.getAll();
            } else {
                notes = await service.getAllUserNotes(request.identity.user);
            }
            reply.status(200).send(notes);
        });

        app.post<{ Body: string }>('/new', async (request, reply) => {
            if (!request.identity || !request.identity.isAuthenticated || !request.identity.user) {
                throw new UnauthorizedError("identity invalid!");
            }
            const service = request.container.get<NoteApplicationService>(NoteApplicationService);
            const note = await service.create(request.body, request.identity.user);
            reply.status(201).send(note);
        });

        app.get<{ Params: { id: number } }>('/:id', { schema: { params: { id: { type: 'number' } } } }, async (request, reply) => {
            if (!request.identity || !request.identity.isAuthenticated || !request.identity.user) {
                throw new UnauthorizedError("identity invalid!");
            }
            const service = request.container.get<NoteApplicationService>(NoteApplicationService);
            const note = await service.get(request.params.id);
            if (note.owner.id !== request.identity.user.id && !request.identity.user.isAdmin) {
                throw new AccessForbiddenError('user cannot access note')
            }
            reply.status(200).send(note);
        });

        app.put<{ Params: { id: number }, Body: string }>('/:id', { schema: { params: { id: { type: 'number' } } } }, async (request, reply) => {
            if (!request.identity || !request.identity.isAuthenticated || !request.identity.user) {
                throw new UnauthorizedError("identity invalid!");
            }
            const service = request.container.get<NoteApplicationService>(NoteApplicationService);
            let note = await service.get(request.params.id);
            if (note.owner.id !== request.identity.user.id && !request.identity.user.isAdmin) {
                throw new AccessForbiddenError('user cannot access note')
            }
            note = await service.update(note, request.body);
            reply.status(200).send(note);
        });

        app.delete<{ Params: { id: number } }>('/:id', { schema: { params: { id: { type: 'number' } } } }, async (request, reply) => {
            if (!request.identity || !request.identity.isAuthenticated || !request.identity.user) {
                throw new UnauthorizedError("identity invalid!");
            }
            const service = request.container.get<NoteApplicationService>(NoteApplicationService);
            const note = await service.get(request.params.id);
            if (note.owner.id !== request.identity.user.id && !request.identity.user.isAdmin) {
                throw new AccessForbiddenError('user cannot access note')
            }
            await service.delete(note);
            reply.status(200).send(note);
        });
        done();
    };
}