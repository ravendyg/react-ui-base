import { Session } from '@modules/session/sessionEntity';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import { Dictionary } from '../types';
import { MockSessionDao } from "@mocks/MockSessionDao";

export type Context<B> = {
    session: Session | null;
    params: Dictionary<string>;
    body: B;
    // @todo: fix all issues thet require direct acess to the Express API.
    req: Request;
    res: Response;
};

export type RouteHandler<T, B> = (ctx: Context<B>) => Promise<T | null>;
const processabeleErorrs = new Set([
    StatusCodes.BAD_REQUEST,
    StatusCodes.NOT_FOUND,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.FORBIDDEN,
    StatusCodes.NOT_IMPLEMENTED,
]);
export function handleRoute<T, B = {}>(handler: RouteHandler<T, B>) {
    return async function (req: Request, res: Response) {
        try {
            let session: Session | null = null;
            const sessionId = req.cookies.sessionId || req.headers.sessionId;
            if (sessionId) {
                const sessionDao = new MockSessionDao();
                session = await sessionDao.getById(sessionId);
            }
            const ctx = {
                session,
                params: req.params,
                body: req.body,
                req,
                res,
            };
            const data = await handler(ctx);
            const r = res.status(StatusCodes.OK);
            if (typeof data === 'object') {
                r.json(data);
            } else {
                r.send(data || '');
            }
        } catch (e) {
            if (processabeleErorrs.has(e.code)) {
                const r = res.status(e.code);
                if (e.message && typeof e.message === 'object') {
                    r.json(e.message);
                } else {
                    r.send(e.message || '');
                }
            } else {
                console.error(e);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('');
            }
        }
    }
}
export function createRouteError(code: number, message: string) {
    const e = new Error(message) as any;
    e.code = code;
    return e;
}
