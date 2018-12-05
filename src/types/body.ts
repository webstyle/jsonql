import { Params } from "./params";
import { Fields } from "./fields";

export interface JSONQLBody {
    method: string;
    params?: Params[] | any;
    fields: string[];
}