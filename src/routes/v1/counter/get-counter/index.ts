import { Router, Request, Response, NextFunction } from "express";
import { CounterModel } from "database/models";
import { CounterUUID } from "database/models/counter/properties";

interface EnhancedRequest extends Request {
    counter?: CounterModel;
}

const handler = async (req: EnhancedRequest, res: Response, next: NextFunction) => {

    try {

        return res.status(200).send(req.counter!);

    } catch (error) {

        next(error);

    }

}

const validate_route_params = async (req: EnhancedRequest, res: Response, next: NextFunction) => {

    const counter_uuid = new CounterUUID(req.params.counter_uuid);

    const errors = counter_uuid.validate();

    if (errors.has_errors) {

        return next(new Error('Validation failed.'));

    }

    const result = await CounterModel.find_by_uuid(counter_uuid.value);

    if (result.is_error) {

        return next(result.error);

    }

    req.counter = result.data;

    next();

}

export default function configure(router: Router) {

    router.get(
        '/counter/:counter_uuid',
        validate_route_params,
        handler,
    );

};
