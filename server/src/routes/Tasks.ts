import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import { handleRoute, verifyAuthorization } from './handlers';
import { MockTaskDao } from '@mocks/MockTaskDao';
import { NeedToCreate } from '@modules/task/models/NeedToCreate';
import { Task } from '@modules/task/models/Task';
import { TaskEntityImp } from '@modules/task/TaskEntityImpl';

const taskDao = new MockTaskDao();

export const tasksRouter = Router();

tasksRouter.get('/current', handleRoute<Task | null>(async (_ctx) => {
    const ctx = verifyAuthorization(_ctx);
    const taskEntity = new TaskEntityImp(taskDao);
    const task = taskEntity.getCurrent(ctx.session.user.id);
    return task;
}));

tasksRouter.get('/need-to-create', handleRoute<NeedToCreate>(async (_ctx) => {
    const ctx = verifyAuthorization(_ctx);
    return {
        added: 0,
        required: 10,
    };
}));
