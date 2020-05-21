import * as JsExpressServer from 'js-express-server'
import routes from './routes'

const settings = JsExpressServer.defaultSettings();
settings.host = process.env.HOST || 'smartservice';
settings.apiOriginPath = '/hdd-smart/analyse';
settings.port = parseInt(process.env.PORT || '8080');

const server = JsExpressServer.createServer(settings);
server.applyRoutes(routes);

server.start();

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

