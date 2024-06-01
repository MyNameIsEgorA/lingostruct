function saveToSessionStorage<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    return function (this: This, ...args: Args): Return {
        const result: Return = target.apply(this, args);
        if (this.setDataInSessionStorage) {
            this.setDataInSessionStorage();
        }
        return result;
    }
}