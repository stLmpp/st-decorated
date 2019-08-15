import { Util } from "../shared/util";
export function Service(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        target.$stType = 'service';
        Util.$inject(target, config.inject, config.providers);
        target = Util.injectAll(target);
        if (config.nonSingleton) {
            const origin = target;
            target.$stNonSingleton = true;
            target.$stFactory = function () {
                return origin;
            };
            window.$stDecorate.nonSingletons.push(target.$stName);
        }
        return target;
    };
}
