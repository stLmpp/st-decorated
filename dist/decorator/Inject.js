import { $inject } from "../shared/util";
export function Inject(...injections) {
    return function (target, key, descriptor) {
        injections = injections ?? [];
        if (descriptor) {
            $inject(descriptor.value, injections);
        }
        else {
            $inject(target, injections);
        }
    };
}
