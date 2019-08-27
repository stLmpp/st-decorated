import { $inject, injectAll } from "../shared/util";
export function Config(...injections) {
    return function (target) {
        injections = injections || [];
        $inject(target, injections);
        target.$stType = 'config';
        return injectAll(target, '$execute');
    };
}
