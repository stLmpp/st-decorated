import { Util } from "../shared/util";
export function Factory(config = {}) {
    return function (target) {
        target.$stFactoryName = config.name || target.name;
        Util.$inject(target, config.inject);
    };
}
