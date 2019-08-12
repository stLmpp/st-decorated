import { Util } from "../shared/util";
export function Run(...injections) {
    return function (target) {
        Util.$inject(target, injections || []);
        return Util.injectAll(target, '$execute');
    };
}
