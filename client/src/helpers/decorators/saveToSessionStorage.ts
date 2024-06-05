import {BaseSavingDataClass} from "@/types/BaseSavingDataClass";

export function saveToSessionStorage<This extends BaseSavingDataClass, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    return function (this: This, ...args: Args): Return {
        const result: Return = Reflect.apply(target, this, args);
        this.saveStateToStorage();

        return result;
    }
}