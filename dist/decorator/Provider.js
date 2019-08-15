import { Util } from "../shared/util";
export function Provider(config = {}) {
    return function (target) {
        target.$stName = config.name || target.name;
        config.inject = config.inject || [];
        Util.$inject(target, config.inject);
        target.$stType = 'provider';
        return Util.injectAll(target);
    };
}
