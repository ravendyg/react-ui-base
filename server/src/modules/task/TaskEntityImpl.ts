import { TaskDao } from "./models/TaskDao";
import { TaskEntity } from "./models/TaskEntity";

export class TaskEntityImp implements TaskEntity {
    constructor(private _dao: TaskDao) { }

    async getCurrent(userId: number) {
        const record = await this._dao.getCurrent(userId);
        if (!record) return null;
        const {
            userId: _,
            ...task
        } = record;
        return task;
    }
}
