import express = require('express');
import { Request, Response } from "express";
const bodyParser = require('body-parser');

import { JSONQLBody } from "./types/body";

// JsonRPC server like GraphQL
export class JsonQLServer {
    private readonly app: any;
    private readonly methods: object;

    constructor(methods: object) {
        this.app = express();
        this.app.use(bodyParser.json());

        this.methods = methods;

        this.app.post('/', (req: Request, res: Response) => {
            const body: JSONQLBody = req.body;

            if (!this.methods[body.method]) {
                return res.json({ message: 'Method not found' })
            }
            const method: Function = this.methods[body.method];

            return method(body)
                .then(result => res.json(this.setFields(body.fields, result)))
                .catch(error => res.json({ message: error.message }));
        });
    }

    listen(port: number) {
        this.app.listen(port);
    }

    setFields(fields: string[], result: Object | any[]) {
        // Array
        if (Array.isArray(result)) {
            return false;
        }

        // Object
        const data = {};
        fields.forEach(field => data[field] = result[field]);
        return data;
    }

}

// Quick example
const app = new JsonQLServer({
    'add': async ({ params, fields }) => {
        const { a, b } = params;
        return { a, b, data: a + b, name: 'Farrukh'+ a+b };
    }
});
app.listen(3000);
console.log('Server is run on 3000');