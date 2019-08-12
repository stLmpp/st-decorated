import { Util } from "../shared/util";
export function Filter(config = {}) {
    return function (target) {
        target.$stFilterName = config.name || target.name;
        Util.$inject(target, config.inject);
        return Util.injectAll(target);
    };
}
