import {Request, Response} from 'express'
import {SmartHelper} from "../model/smart";
import {Analyzer} from "../service/analyzer";
import {send} from "../service/helper";

interface HealthRequest {
    vendor_id: string;
    id: number;
    raw_data: string;
    value_raw: string;
    value: string;
    worst: number;
    threshold: number;
}

export default function (req: Request, res: Response) {
    const smartRequest: SmartHelper = req.body;
    console.log(req.body);

    const analyzer: Analyzer = new Analyzer();
    analyzer.analyze(smartRequest);

    send(res, smartRequest);
}
