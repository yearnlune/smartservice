import * as express from "express";

const router = express.Router();

router.get('/_/health',
    require('nodepress-healthchecker'));

router.post('/smart/health',
    require('./controller/healthHelper').default);

export default router;

