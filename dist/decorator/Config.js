import { Util } from "../shared/util";
export function Config(...injections) {
    return function (target) {
        injections = injections || [];
        Util.$inject(target, injections.map(inject => {
            if (!/Provider$/.test(inject)) {
                inject += 'Provider';
            }
            return inject;
        }));
        target.$stType = 'config';
        return Util.injectAll(target, '$execute');
    };
}
