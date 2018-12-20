import "reflect-metadata";
import { SetType } from "../store";


export function JSONQLType(target: Function) {
    SetType(target.name, {
        name: target.name,
        fields: [],
    });
}
