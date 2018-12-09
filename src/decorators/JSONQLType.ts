import "reflect-metadata";
import { JSONQLTypeConfig } from "../types/JSONQLTypeConfig";

const Store = require('data-store');
const store = new Store({ path: '../types.json' });


export function JSONQLType(target: Function) {
        const type: JSONQLTypeConfig = {
            name: target.name,
            target,
            fields: [],
        };
        store.set(target.name, type);
}
