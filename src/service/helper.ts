import {Response} from "express";
import {MessageResolver} from "js-express-server";

export function send(res: Response, payload: any) {
    if (process.env.NODE_ENV == 'development') {
        res.header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "X-Requested-With");
    }

    res.status(200)
        .header('application/json')
        .send(JSON.stringify(payload));
}

export function sendErrorResponse(res: Response, code: number, messageId: string) {
    res.status(code);
    res.send({
        message: messageId,
        messageLocaled: MessageResolver.resolve(messageId)
    });
}
