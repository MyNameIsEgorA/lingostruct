export function onClientSide(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        if (typeof localStorage !== 'undefined') {
            return originalMethod.apply(this, args);
        } else {
            console.error('localStorage is not available');
        }
    };
}