# JSONQL


## About
Simple implementation of RPC server like GraphQL.

## Install
At this time we don't have npm package, you need to clone repo.
```bash
https://github.com/WebStyle/jsonql.git
```
install deps:
```bash
cd jsonql && npm install
```

Quick example: 
```typescript
import { JsonQLServer, JSONQLType, Field } from "./src";


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
```

Request example:
```bash
{
	"method": "add",
	"params": { "a": 1, "b": 2 },
	"fields": ["a"]
}	
```
