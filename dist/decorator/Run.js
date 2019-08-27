import { $inject, injectAll } from "../shared/util";
export function Run(...injections) {
    return function (target) {
        $inject(target, injections || []);
        target.$stType = 'run';
        return injectAll(target, '$execute');
    };
}
