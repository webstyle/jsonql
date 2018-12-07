const Store = require('data-store');
const store = new Store({ path: 'types.json' });


export function JSONQLType(target: any) {
    const original = target;
    console.log(target);
}