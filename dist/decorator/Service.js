import { $inject, injectAll } from "../shared/util";
export function Service(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        target.$stType = 'service';
        $inject(target, config.inject, config.providers);
        target = injectAll(target);
        const origin = target;
        target.$stFactory = function () {
            return origin;
        };
        if (config.global === true) {
            window.$stDecorate.globalProviders.push(target);
        }
        return target;
    };
}
