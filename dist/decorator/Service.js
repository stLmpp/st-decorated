import { Util } from "../shared/util";
export function Service(config = {}) {
    return function (target) {
        target.$stServiceName = config.name || target.name;
        Util.$inject(target, config.inject, config.providers);
        target = Util.injectAll(target);
        if (config.nonSingleton) {
            const origin = target;
            target.$stNonSingleton = true;
            target.$stFactory = function () {
                return origin;
            };
            window.$stDecorate.nonSingletons.push(target.$stServiceName);
        }
        return target;
    };
}
