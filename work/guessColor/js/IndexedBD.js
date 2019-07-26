let flipGameDB,
    flipGameStorage = 'flipGameStorage',
    zx;

function init() {
    return new Promise((resolve, reject) => {
        let storageDB = indexedDB.open(flipGameStorage, 1);

        storageDB.onsuccess = () => {
            console.log('xxx');
            resolve(flipGameDB = storageDB.result);

        };

        storageDB.onerror = (err) => {
            return err;
        };

        storageDB.onupgradeneeded = (event) => {
            let flipGameDB = storageDB.result;
            flipGameDB.createObjectStore(flipGameStorage, {
                keyPath: 'id',
                autoIncrement: true
            });

        }
    });

}


function addToStorage(el1) {
    let element1 = {
        color: el1.style.backgroundColor,
        opacity: el1.style.opacity,
        id: el1.id
    };

    // let element2 = {
    //     color: el2.style.backgroundColor,
    //     opacity: el2.style.opacity,
    //     id: el2.id
    // };

    let transaction = flipGameDB.transaction([flipGameStorage], 'readwrite');
    let storage = transaction.objectStore(flipGameStorage);
    let request = storage.add({
        color: el1.style.backgroundColor,
        opacity: el1.style.opacity,
        idEl: el1.id
    }    );
    request.onsuccess = () => {
        return storage.result;
    };
}

function getAll() {
    return new Promise((resolve, reject) => {
        let transaction = flipGameDB.transaction([flipGameStorage], 'readonly');
        let storage = transaction.objectStore(flipGameStorage);
        let request = storage.getAll();
        request.onsuccess = () => {
            resolve(request.result);
            // request.result
        };
        console.log('4654');
        // return request;
    })
}


