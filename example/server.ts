import "reflect-metadata";
import { JsonQLServer, JSONQLType, Field } from "../src";


class Company {
    @Field() name
}

@JSONQLType
class User {
    @Field() a: number;
    @Field() b: string;
    @Field() company: Company;
}

// Quick example
const app = new JsonQLServer({
    add: async (params: User, fields: string[]) => {
        const { a, b } = params;
        return { a, b, data: a + b, name: 'Farrukh'+ a+b };
    },
    list: async (params, fields: string[]) => {
        return [{ name: 'Martin', id: 1 }, { name: 'John Doe', id: 2 }];
    }
});
app.listen(3000);
console.log('Server is run on 3000');
