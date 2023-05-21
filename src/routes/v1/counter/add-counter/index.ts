import { Router, Request, Response, NextFunction } from "express";
import { CounterModel } from "database/models";

interface EnhancedRequest extends Request {
    counter?: CounterModel;
}

const handler = async (req: EnhancedRequest, res: Response, next: NextFunction) => {

    try {
        
        const counter = req.counter!;

        const result = await counter.save();

        if (result.is_error === false) {

            return res.status(201).send(result.data);

        }

        next(result.error);

    } catch (error) {
        
        next(error);

    }

};

const validate_request_body = (req: EnhancedRequest, res: Response, next: NextFunction) => {

    const counter = new CounterModel(req.body);

    const errors = counter.validate();

    if (errors.length > 0) {
        
        return next(new Error('Validation failed.'));

    }

    req.counter = counter;

    next();

};

export default function configure(router: Router): void {

    router.post(
        '/counter',
        validate_request_body,
        handler,
    );

};
