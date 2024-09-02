

export function setlocalStorage (key , value) {
    if (typeof (value) =="object") {
        value= JSON.stringify(value)
    }
    localStorage.setItem(key , value)
};

export function getlocalstorsge (key ) {
    localStorage.getItem(key)
}

export function removestorage (key) {
    localStorage.removeItem(key)
}