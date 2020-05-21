import {Smart, SmartHelper} from "../model/smart";
import {SANDFORCE, STATUS, VENDOR} from "../model/smartEnum";

export class Analyzer {
    private init(smartHelper: SmartHelper) {
        const vendorId = smartHelper.vendorId;
        smartHelper.diskLifeIdList = this.getDiskLifeIdListByVendor(vendorId);
        smartHelper.isRawValues8 = this.isRawValues8(vendorId);
    }

    public analyze(smartHealthRequest: SmartHelper) {
        this.init(smartHealthRequest);

        smartHealthRequest.smartList.some((smart) => {
            if (this.isDiskLifeId(smart.id, smartHealthRequest.diskLifeIdList)) {
                smart.status = this.checkDiskLife(smart);
                return false;
            }
            if (smartHealthRequest.vendorId === VENDOR.SAND_FORCE &&
                smart.id === SANDFORCE.READ_ERROR_RATE) {
                smart.status = this.checkReadErrorRateForSandForce(smart);
                return false;
            }

            smart.status = this.checkGeneralSmartStatus(smart, smartHealthRequest.isRawValues8);
        })

    }

    private getDiskLifeIdListByVendor(vendorId: string): number[] {
        let diskLifeIds: number[] = [];

        switch (vendorId) {
            case VENDOR.CORSAIR:
            case VENDOR.SAND_FORCE:
            case VENDOR.KINGSTON:
                diskLifeIds.push(231);
                break;
            case VENDOR.INDLINX:
                diskLifeIds.push(209);
                break;
            case VENDOR.INTEL:
            case VENDOR.PLEXTOR:
            case VENDOR.SANDISK:
                diskLifeIds.push(232);
                break;
            case VENDOR.SAMSUNG:
                diskLifeIds.push(179, 180);
                break;
            case VENDOR.MTRON:
                diskLifeIds.push(187);
                break;
            case VENDOR.MICRON:
                diskLifeIds.push(202);
                break;
            case VENDOR.OCZ:
            case VENDOR.OCZ_VECTOR:
                diskLifeIds.push(233);
                break;
            case VENDOR.J_MICRON61X:
                diskLifeIds.push(170);
                break;
            default:
                break;
        }

        return diskLifeIds;
    }

    private isDiskLifeId(smartId: number, diskLifeIds: number[]): boolean {
        diskLifeIds.forEach((diskLifeId) => {
            if (diskLifeId === smartId) {
                return true;
            }
        })
        return false;
    }

    private checkDiskLife(smart: Smart): STATUS {
        if (smart.value < smart.threshold) {
            return STATUS.DANGER;
        } else {
            return STATUS.SUCCESS;
        }
    }

    private checkReadErrorRateForSandForce(smart: Smart): STATUS {
        if (smart.value === 0 &&
            smart.valueRaw.charAt(0) === '0' &&
            smart.valueRaw.charAt(1) === '0') {
            return STATUS.SUCCESS;
        } else if (smart.threshold != 0 &&
            smart.value < smart.threshold) {
            return STATUS.DANGER;
        } else {
            return STATUS.SUCCESS;
        }
    }

    private isRawValues8(vendorId: string) {
        if (vendorId === VENDOR.J_MICRON60X ||
            vendorId === VENDOR.INDLINX) {
            return true;
        }
        return false;
    }

    private checkGeneralSmartStatus(smart: Smart, isRawValues8: boolean): STATUS {
        if (!isRawValues8 || this.isIdUndefinedStatus(smart.id)) {
            if (smart.threshold != 0 && smart.value < smart.threshold) {
                return STATUS.DANGER;
            }
        }
        return STATUS.SUCCESS;
    }

    private isIdUndefinedStatus(smartId: number): boolean {
        return (this.betweenInclusive(smartId, 1, 13) ||
            this.betweenInclusive(smartId, 187, 193) ||
            this.betweenInclusive(smartId, 195, 209) ||
            this.betweenInclusive(smartId, 211, 212) ||
            this.betweenInclusive(smartId, 220, 228) ||
            this.betweenInclusive(smartId, 230, 231) ||
            smartId === 240 ||
            smartId === 250 ||
            smartId === 254
        );
    }

    private betweenInclusive(value: number, a: number, b: number) {
        return a <= value && value <= b;
    }
}
