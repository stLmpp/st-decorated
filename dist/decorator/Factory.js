import { Util } from "../shared/util";
export function Factory(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        Util.$inject(target, config.inject, config.providers);
        target.$stType = 'factory';
        return Util.injectAll(target);
    };
}
