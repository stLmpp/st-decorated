import { $inject, injectAll } from "../shared/util";
export function Factory(config = {}) {
    return function (target) {
        target.$stName = config.name ?? target.name;
        $inject(target, config.inject);
        target.$stType = 'factory';
        return injectAll(target);
    };
}
