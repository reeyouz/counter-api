import { Router } from "express";
import add_counter from "./add-counter";
import get_counter from "./get-counter";
import delete_counter from "./delete-counter";

const router = Router();

add_counter(router);

get_counter(router);

delete_counter(router);

export default router;
