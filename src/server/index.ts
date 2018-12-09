import express = require('express');
import { Request, Response } from "express";
const bodyParser = require('body-parser');

import { JSONQLBody } from "../types/body";

// JsonRPC server like a GraphQL
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

            return method(body.params, body.fields)
                .then(result => res.json(this.setFields(body.fields, result)))
                .catch(error => res.json({ message: error.message }));
        });
        this.app.get('/methods', (req: Request, res: Response) => res.json({ methods: Object.keys(this.methods) }));
    }

    listen(port: number) {
        this.app.listen(port);
    }

    setFields(fields: string[], result: Object | any[]) {
        // Array
        if (Array.isArray(result)) {
            let arr = [];
            result.forEach(item => {
                let object = {};
                fields.forEach(field => object[field] = item[field]);
                arr.push(object)
            });
            return arr;
        }

        // Object
        const data = {};
        fields.forEach(field => data[field] = result[field]);
        return data;
    }

}