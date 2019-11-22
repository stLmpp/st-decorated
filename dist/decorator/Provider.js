import { $inject, injectAll } from "../shared/util";
export function Provider(config = {}) {
    return function (target) {
        target.$stName = config.name ?? target.name;
        config.inject = config.inject ?? [];
        $inject(target, config.inject);
        target.$stType = 'provider';
        return injectAll(target);
    };
}
