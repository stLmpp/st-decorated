import { Util } from "../shared/util";
export function Service(config = {}) {
    return function (target) {
        target.$stServiceName = config.name || target.name;
        if (config.nonSingleton) {
            const origin = target;
            target = function () {
                return origin;
            };
            target.$stNonSingleton = true;
            target.$stServiceName = origin.$stServiceName;
            Util.$inject(target, config.inject, config.providers);
            window.$stDecorate.nonSingletons.push(target.$stServiceName);
            return target;
        }
        Util.$inject(target, config.inject, config.providers);
        return Util.injectAll(target);
    };
}
