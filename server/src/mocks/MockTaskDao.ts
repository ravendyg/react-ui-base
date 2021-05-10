import { TaskDao } from "@modules/task/models/TaskDao";
import { TaskRecord } from "@modules/task/models/TaskRecord";
import { MockStorage } from "./MockStorage";

export class MockTaskDao implements TaskDao {
    private _mockDb = new MockStorage<TaskRecord>('tasks.json');

    async getCurrent(userId: number) {
        const db = await this._mockDb.openDb();
        const user = db.find(t => t.userId === userId) || null;
        return user;
    }
}
