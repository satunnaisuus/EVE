const DB_NAME = 'eve';
const DB_VERSION = 2;

const MIGRATIONS: {[key: number]: (db: IDBDatabase) => void} = {
    1: function (db: IDBDatabase) {
        db.createObjectStore('genomes', {keyPath: 'id'});
    },
    2: function (db: IDBDatabase) {
        db.createObjectStore('save', {keyPath: 'id'});
        db.createObjectStore('save_dump', {keyPath: 'id'});
    },
}

export abstract class IndexedBdRepository {
    protected openRequest: IDBOpenDBRequest;

    protected db: IDBDatabase;

    constructor(protected storeName: string) {
        this.openRequest = indexedDB.open(DB_NAME, DB_VERSION);

        this.openRequest.addEventListener('upgradeneeded', (e) => {
            const db = this.openRequest.result;

            for (let i = e.oldVersion + 1; i <= e.newVersion; i++) {
                MIGRATIONS[i](db);
            }
        });
          
        this.openRequest.addEventListener('error', () => {
            console.error("Error", this.openRequest.error);
        });
        
        this.openRequest.addEventListener('success', () => {
            this.db = this.openRequest.result;
        });
    }

    async getStore(mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
        const db = await this.getDB();
        const transaction = db.transaction(this.storeName, mode);
        return transaction.objectStore(this.storeName);
    }

    getDB(): Promise<IDBDatabase> {
        return new Promise((resolve) => {
            if (this.db) {
                resolve(this.db);
            } else {
                this.openRequest.addEventListener('success', () => resolve(this.openRequest.result))
            }
        });
    }
}