import { FastifyRequest, FastifyReply } from "fastify";
import { AccessForbiddenError, ConflictError, InternalError, NotFoundError, TooManyRequestsError, UnauthorizedError } from "../../application/error/errors";

export function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    console.log(error)
    if (error instanceof UnauthorizedError) {
        reply.status(401).send(error.message)
    } else if (error instanceof AccessForbiddenError) {
        reply.status(403).send(error.message)
    } else if (error instanceof NotFoundError) {
        reply.status(404).send(error.message)
    } else if (error instanceof ConflictError) {
        reply.status(409).send(error.message)
    } else if (error instanceof TooManyRequestsError) {
        reply.status(429).send(error.message)
    } else if (error instanceof InternalError) {
        reply.status(500).send(error.message)
    }
}