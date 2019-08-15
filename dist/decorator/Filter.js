import { Util } from "../shared/util";
export function Filter(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        target.$stType = 'filter';
        Util.$inject(target, config.inject);
        target = Util.injectAll(target);
        return target;
    };
}
