import "reflect-metadata";

import { FieldInnerConfig } from "../types/FieldInnerConfig";
import { JSONQLTypeConfig } from "../types/JSONQLTypeConfig";
import { typeStore } from "../store";

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

        typeStore.setField(finalConfig, targetInstance.constructor.name);
    };
}