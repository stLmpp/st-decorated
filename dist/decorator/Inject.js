export function Inject(...injections) {
    return function (target, key, descriptor) {
        injections = injections || [];
        if (descriptor) {
            descriptor.value.$inject = injections;
        }
        else {
            target.$inject = injections;
        }
    };
}
