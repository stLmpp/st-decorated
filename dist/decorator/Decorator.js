import { $inject, injectAll } from "../shared/util";
export function Decorator(config) {
    return function (target) {
        target.$stDecoratedName = config.decorated;
        $inject(target, config.inject);
        target.$stType = 'decorator';
        return injectAll(target);
    };
}
