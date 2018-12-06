const store = [];

export function JSONQLType(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
    console.log(constructor);
}