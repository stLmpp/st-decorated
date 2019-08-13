import { Util } from "../shared/util";
export function Provider(config = {}) {
    return function (target) {
        target.$stProviderName = config.name || target.name;
        config.inject = config.inject || [];
        Util.$inject(target, config.inject);
        console.log(target);
        return Util.injectAll(target);
    };
}
