import {Route} from 'js-express-server'

type RouteListType = Route[];

const routes: RouteListType = [
    {
        path: '/health',
        method: 'post',
        consumes: 'application/json',
        handler: require('./controller/healthHelper')
    },
    {
        path: '/_/healthcheck',
        method: 'get',
        handler: require('./healthcheck')
    }
];

export default routes;

