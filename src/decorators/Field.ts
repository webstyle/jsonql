import "reflect-metadata";

import { FieldInnerConfig } from "../types/FieldInnerConfig";
import { JSONQLTypeConfig } from "../types/JSONQLTypeConfig";
import { SetType, Types } from "../store";

const Store = require('data-store');
const store = new Store({ path: '../types.json' });

export function Field(options?: Object): PropertyDecorator {
    return (targetInstance: Object, fieldName: string) => {
        const finalConfig: FieldInnerConfig = {
            property: fieldName,
            name: fieldName,
            isNullable: true,
            type: Reflect.getMetadata("design:type", targetInstance, fieldName).name,
            ...options,
        };

        const typeConfig: JSONQLTypeConfig = store.get(targetInstance.constructor.name);
        typeConfig.fields.push(finalConfig);
        store.set(targetInstance.constructor.name, typeConfig);


        console.log(store.get(targetInstance.constructor.name));
    };
}