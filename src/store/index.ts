import { JSONQLTypeConfig } from "../types/JSONQLTypeConfig";
import { FieldInnerConfig } from "../types/FieldInnerConfig";

class TypeStore {
    data: JSONQLTypeConfig[] = [];

    setJsonQLType(name) {
        this.data.push({ name, fields: [] })
    }

    setField(item: FieldInnerConfig, targetName: string) {
        const targetExisits = this.data.find(element => element.name === targetName);

        if (targetExisits) {
            this.data.forEach(element => element.name && targetName && element.fields.push(item));
        } else {
            this.data.push({
                name: targetName,
                fields: [item]
            })
        }
    }
}

export const typeStore = new TypeStore();