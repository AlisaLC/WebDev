import { Container } from 'inversify';
import { User } from './../domain/user'

declare module 'fastify' {
    interface FastifyRequest {
        container: Container;
        identity: {
            isAuthenticated: boolean;
            user?: User;
        };
    }
}