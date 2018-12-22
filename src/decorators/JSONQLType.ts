import "reflect-metadata";
import { typeStore } from "../store";


export function JSONQLType(target: Function) {
    typeStore.setJsonQLType(target.name);
}
