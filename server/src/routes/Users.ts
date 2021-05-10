import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { MockSessionDao } from "@mocks/MockSessionDao";
import { createRouteError, handleRoute, verifyAuthorization } from '@routes/handlers';
import { MockUserDao } from '@mocks/MockUserDao';
import { User } from '@modules/user/models/User';
import { GoogleUser } from '@modules/user/models/GoogleUser';
import { UserEntityImpl } from '@modules/user/UserEntityImpl';
import { SessionEntityImpl } from '@modules/session/SessionEntityImpl';

// Singleton for idToken verification.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(googleClientId);
const userDao = new MockUserDao();
const sessionDao = new MockSessionDao();

export const userRouter = Router();

userRouter.get('/', handleRoute<{ user: User }>(async (_ctx) => {
    const ctx = verifyAuthorization(_ctx);
    return {
        user: ctx.session.user,
    };
}));

type SignupBody = {
    idToken: string;
};
type SignResponse = {
    sessionId: string;
    user: User;
};
userRouter.post('/signup-google', handleRoute<SignResponse, SignupBody>(async function (ctx) {
    const sessionEntity = new SessionEntityImpl(sessionDao);
    if (ctx.session) {
        // remove existing session to prevent collisions
        await sessionEntity.removeById(ctx.session.id);
    }
    const { idToken } = ctx.body;
    if (!idToken) {
        throw createRouteError(StatusCodes.BAD_REQUEST, 'missing idToken');
    }
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: googleClientId,
    });
    const decodedToken = ticket.getPayload();
    if (!decodedToken) {
        throw createRouteError(StatusCodes.BAD_REQUEST, 'invalid idToken');
    }
    const user: GoogleUser = {
        email: decodedToken.email || '',
        familyName: decodedToken.family_name || '',
        givenName: decodedToken.given_name || '',
        imageUrl: decodedToken.picture || '',
        name: decodedToken.name || '',
    };
    const userEntity = new UserEntityImpl(userDao);
    const newUser = await userEntity.createGoogleUser(user);
    const newSession = await sessionEntity.create(newUser);
    ctx.res.cookie('sessionId', newSession.id);
    return {
        sessionId: newSession.id,
        user: newUser,
    };
}));

userRouter.post('/sign-out', handleRoute<void, {}>(async function (ctx) {
    const sessionEntity = new SessionEntityImpl(sessionDao);
    if (ctx.session) {
        // remove existing session to prevent collisions
        await sessionEntity.removeById(ctx.session.id);
    }
}));
