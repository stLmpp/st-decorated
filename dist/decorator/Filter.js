import { $inject, injectAll } from "../shared/util";
export function Filter(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        target.$stType = 'filter';
        $inject(target, config.inject);
        target = injectAll(target);
        return target;
    };
}
