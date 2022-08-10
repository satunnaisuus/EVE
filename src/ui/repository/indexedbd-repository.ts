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

    async getStore(mode: IDBTransactionMode = 'readonly'): Promise<Store> {
        const db = await this.getDB();
        const transaction = db.transaction(this.storeName, mode);
        return new Store(transaction.objectStore(this.storeName));
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

class Store {
    constructor(private store: IDBObjectStore) {

    }

    add(value: unknown, key?: IDBValidKey): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.store.add(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }
    
    delete(query: IDBValidKey | IDBKeyRange): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.store.delete(query);
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }
    
    get<T>(query: IDBValidKey | IDBKeyRange): Promise<T> {
        return new Promise((resolve, reject) => {
            const request = this.store.get(query);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject();
        });
    }
    
    getAll<T>(query?: IDBValidKey | IDBKeyRange | null, count?: number): Promise<T[]> {
        return new Promise((resolve, reject) => {
            const request = this.store.getAll(query, count);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject();
        });
    }
    
    put(value: unknown, key?: IDBValidKey): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.store.put(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject();
        });
    }
}