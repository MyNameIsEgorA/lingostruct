export const emailValidation = (email: string): boolean => {
    const regex: RegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email)
}

export const fullNameValidation = (name: string): boolean => {
    const regex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
    return regex.test(name);
}

export const passwordValidation = (password: string): boolean => {
    return (password.length > 8 && /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password))
}