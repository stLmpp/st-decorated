import { Util } from "../shared/util";
export function Filter(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        Util.$inject(target, config.inject);
        target.$stType = 'filter';
        return Util.injectAll(target);
    };
}
