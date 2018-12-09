import { FieldInnerConfig } from "./FieldInnerConfig";

export interface JSONQLTypeConfig {
    name: string;
    target: Function,
    fields: FieldInnerConfig[]
}
