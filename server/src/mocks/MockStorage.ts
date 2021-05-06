import { promises as fs } from 'fs';
// import jsonfile from 'jsonfile';
import path from 'path';

export class MockStorage<T> {
    private _dbFilePath: string;
    constructor(fileName: string) {
        this._dbFilePath = path.join(__dirname, 'storage', fileName);
    }

    async openDb(): Promise<T[]> {
        try {
            const data = await fs.readFile(this._dbFilePath, { encoding: 'utf-8' });
            return JSON.parse(data);
        } catch {
            return [];
        }
        // return jsonfile.readFile(this._dbFilePath) as Promise<T[]>;
    }


    async saveDb(db: T[]): Promise<void> {
        await fs.writeFile(this._dbFilePath, JSON.stringify(db, null, 2), { encoding: 'utf-8' });
        // try {
        //     await fs.access(this._dbFilePath);
        // } catch {
        // }
        // return jsonfile.writeFile(this._dbFilePath, JSON.stringify(db));
    }
}
