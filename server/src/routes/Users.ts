import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { MockSessionDao } from "@mocks/MockSessionDao";
import { createRouteError, handleRoute } from '@routes/handlers';
import { GoogleUser, User } from '@modules/user/userEntity';
import { MockUserDao } from '@mocks/MockUserDao';

// Singleton for idToken verification.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(googleClientId);

export const userRouter = Router();

userRouter.get('/', handleRoute<{ user: User }>(async function (ctx) {
    if (!ctx.session) {
        throw createRouteError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }
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
    const sessionDao = new MockSessionDao();
    if (ctx.session) {
        // remove existing session to prevent collisions
        await sessionDao.removeById(ctx.session.id);
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
    const userDao = new MockUserDao();
    const newUser = await userDao.createGoogleUser(user);
    const newSession = await sessionDao.create(newUser);
    ctx.res.cookie('sessionId', newSession.id);
    return {
        sessionId: newSession.id,
        user: newUser,
    };
}));

userRouter.post('/sign-out', handleRoute<void, {}>(async function (ctx) {
    const sessionDao = new MockSessionDao();
    if (ctx.session) {
        // remove existing session to prevent collisions
        await sessionDao.removeById(ctx.session.id);
    }
}));
