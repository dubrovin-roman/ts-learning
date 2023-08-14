"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TFInsurance {
    setCar(car) {
        this.car = car;
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch("tf.ru", {
                method: "POST",
                body: JSON.stringify({ car: this.car }),
            });
            const data = yield res.json();
            return data.isSuccess;
        });
    }
}
class ABInsurance {
    setCar(car) {
        this.car = car;
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch("ab.ru", {
                method: "POST",
                body: JSON.stringify({ car: this.car }),
            });
            const data = yield res.json();
            return data.isSuccess;
        });
    }
}
class InsuranceFactory {
    saveHistory(ins) {
        this.db.save(ins.id, ins.status);
    }
}
class TFInsuranceFactory extends InsuranceFactory {
    createFactory() {
        return new TFInsurance();
    }
}
class ABInsuranceFactory extends InsuranceFactory {
    createFactory() {
        return new ABInsurance();
    }
}
const tfInsuranceFactory = new TFInsuranceFactory();
const insurance = tfInsuranceFactory.createFactory();
tfInsuranceFactory.saveHistory(insurance);
// альтернативный метод создания фабрики
const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance,
};
class InsuranceFactoryAlt {
    createInsurance(type) {
        return INSURANCE_TYPE[type];
    }
    saveHistory(ins) {
        this.db.save(ins.id, ins.status);
    }
}
const insuranceFactoryAlt = new InsuranceFactoryAlt();
const ins = new (insuranceFactoryAlt.createInsurance("tf"))();
insuranceFactoryAlt.saveHistory(ins);
