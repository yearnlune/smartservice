import {STATUS} from "./smartEnum";

export interface Smart {
    id: number;
    rawData: string;
    valueRaw: string;
    value: number;
    worst: number;
    threshold: number;
    status?: STATUS;
}

export interface SmartHelper {
    vendorId: string;
    smartList: Smart[];
    diskLifeIdList: number[];
    isRawValues8: boolean;
}
