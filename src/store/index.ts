import { JSONQLTypeConfig } from "../types/JSONQLTypeConfig";
import { FieldInnerConfig } from "../types/FieldInnerConfig";

class Type {
    constructor(public name: string) {}

    fields: FieldInnerConfig[]

    toString() {
        return 'hello'
    }
}

class TypeStore {
    data: Type[] = [];

    setJsonQLType(name) {
        this.data.push({ name, fields: [] })
    }

    setField(item: FieldInnerConfig, targetName: string) {
        const targetExisits = this.data.find(element => element.name === targetName);
        const fieldType = this.data.find(element => element.name === item.typeName);

        if (fieldType) {
          item.type = fieldType;
        }

        if (targetExisits) {
            this.data.forEach(element => element.name && element.name === targetName && element.fields.push(item));
        } else {
            const type = new Type(targetName)
            type.fields = [item]
            this.data.push(type)
        }
    }

    toObject() {
        return this.data.map((type) => {
            return
        })
    }
}

export const typeStore = new TypeStore();