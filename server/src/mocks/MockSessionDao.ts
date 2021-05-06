import { SessionDao } from "@modules/session/sessionDao";
import { Session } from "@modules/session/sessionEntity";
import { User } from "@modules/user/userEntity";
import { MockStorage } from "./MockStorage";

export class MockSessionDao implements SessionDao {
    private _mockDb = new MockStorage<Session>('sessions.json');

    async getById(id: string) {
        const db = await this._mockDb.openDb();
        const session = db.find(s => s.id === id) || null;
        return session;
    }

    async removeById(id: string) {
        const db = await this._mockDb.openDb();
        const newDb = db.filter(s => s.id !== id);
        if (db.length !== newDb.length) {
            await this._mockDb.saveDb(newDb);
        }
    }

    async create(user: User) {
        const db = await this._mockDb.openDb();
        const newSession: Session = {
            expiration: 0,
            id: (Math.random() * 1e9).toFixed(0),
            user,
        };
        db.push(newSession);
        await this._mockDb.saveDb(db);
        return newSession;
    }
}
