import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export class Token {
    private constructor(public readonly content: string, public readonly id: string, public readonly expiration: Date) { }

    static create(claims: Claim[]) {
        const utcNow = Date.now();
        const expirationSeconds = 120 * 60;
        const expiration = new Date(utcNow + expirationSeconds * 1000);
        const id = randomUUID();

        const payload = Object.fromEntries(claims.map((claim) => [claim.type, claim.value]));

        payload.nbf = Math.floor(utcNow / 1000);

        const content = jwt.sign(payload, process.env.JWT_PRIVATE_KEY as string, {
            subject: payload.userId,
            algorithm: 'RS256',
            expiresIn: expirationSeconds,
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
            jwtid: id,
        });

        return new Token(content, id, expiration);
    }

    static from(content: string) {
        const payload = jwt.decode(content, { json: true });
        if (payload == null || payload.exp == null) throw new Error('invalid token');
        const date = new Date(payload.exp);
        return new Token(content, payload.jti!, date);
    }

    verify() {
        try {
            jwt.verify(this.content, process.env.JWT_PUBLIC_KEY as string, { audience: process.env.JWT_AUDIENCE, issuer: process.env.JWT_ISSUER });
            return true;
        } catch (error) {
            return false;
        }
    }

    decode(): TokenPayload | null {
        return jwt.decode(this.content, { json: true });
    }

    toString() {
        return this.content;
    }
}

export type TokenPayload = Record<string, any>;

export enum ClaimType {
    UserId = 'userId',
    IsAdmin = 'isAdmin'
}

export interface Claim {
    type: string;
    value: any;
}