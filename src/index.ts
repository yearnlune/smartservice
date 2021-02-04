import express from 'express';
import routes from './routes'
import * as healthChecker from "nodepress-healthchecker";

const apiOriginPath = '/hdd-smart/analyse/';

/* EXPRESS SERVER INITIALIZATION */
const app = express();

/* ADD ROUTES */
app.use(apiOriginPath, routes);

app.listen({
    host: process.env.HOST || '127.0.0.1',
    port: parseInt(process.env.PORT || '8080'),
    backlog: parseInt(process.env.BACKLOG || '128')
});

healthChecker.init();

// Content-Type: application/json
//
// {
//     "vendorId": "Smart",
//     "smartList": [
//     {
//         "id": 1,
//         "raw_data": "0000039663D0",
//         "value_raw": "0000039663D0",
//         "value": 114,
//         "worst": 99,
//         "threshold": 6
//     },
//     {
//         "id": 3,
//         "raw_data": "000000000000",
//         "value_raw": "000000000000",
//         "value": 99,
//         "worst": 95,
//         "threshold": 0
//     }
// ]
// }

