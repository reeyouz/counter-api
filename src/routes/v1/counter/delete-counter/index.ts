import { RequestHandler, Router } from "express";
import { CounterModel } from "database/models";
import { CounterUUID } from "database/models/counter/properties";

const handler: RequestHandler = async (req, res, next) => {

    try {

        const response = await CounterModel.delete_by_uuid(
            req.params.counter_uuid,
        );

        if (!response.is_error) {

            return res.status(200).send(response.data);

        }

        next(response.error);

    } catch (error) {

        next(error);

    }

}

const validate_route_params: RequestHandler = (req, res, next) => {

    const counter_uuid = new CounterUUID(req.params.counter_uuid);

    const errors = counter_uuid.validate();

    if (errors.has_errors) {

        return next(new Error('Validation failed.'));

    }

    next();

}

export default function configure(router: Router) {

    router.delete(
        '/counter/:counter_uuid',
        validate_route_params,
        handler,
    );

};
