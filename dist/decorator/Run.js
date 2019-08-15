import { Util } from "../shared/util";
export function Run(...injections) {
    return function (target) {
        Util.$inject(target, injections || []);
        target.$stType = 'run';
        return Util.injectAll(target, '$execute');
    };
}
