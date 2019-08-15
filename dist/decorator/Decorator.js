import { Util } from "../shared/util";
export function Decorator(config) {
    return function (target) {
        target.$stDecoratedName = config.decorated;
        Util.$inject(target, config.inject);
        target.$stType = 'decorator';
        return Util.injectAll(target);
    };
}
