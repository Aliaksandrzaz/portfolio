const DB_NAME = 'TODO';
const ITEMS_STORAGE_NAME = 'ITEMS';


export class TodoStorage {

    constructor(){
        this.db;
    }

    init () {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open(DB_NAME, 1);
            openRequest.onerror = err => reject(err);
            openRequest.onsuccess = () => resolve(this.db = openRequest.result);
            openRequest.onupgradeneeded = event => {
                let db = event.target.result;
                db.createObjectStore(ITEMS_STORAGE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                });
            };
        });
    }


    getAll () {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([ITEMS_STORAGE_NAME], 'readonly');
            let storage = transaction.objectStore(ITEMS_STORAGE_NAME);
            let request = storage.getAll();
            request.onerror = err => reject(err);
            request.onsuccess = () => resolve(request.result);
        });
    }

    put (item) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([ITEMS_STORAGE_NAME], 'readwrite');
            let objectStore = transaction.objectStore(ITEMS_STORAGE_NAME);
            let request = objectStore.put(item);
            request.onerror = err => reject(err);
            request.onsuccess = () => resolve(request.result);
        });
    }

    delete (id) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([ITEMS_STORAGE_NAME], 'readwrite');
            let objectStore = transaction.objectStore(ITEMS_STORAGE_NAME);
            let request = objectStore.delete(id);
            request.onerror = err => reject(err);
            request.onsuccess = () => resolve(request.result);
        });
    }

}

export let x = new TodoStorage();