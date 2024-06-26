import React from 'react';

interface IProps {
    value: string,
    placeholder: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}

const ResetPasswordInput: React.FC<IProps> = ({value, setValue, placeholder}) => {

    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <div className='text-gray-800 font-medium'>{placeholder}</div>
            <input
                className='w-full bg-gray-100 rounded-[8px] p-3 outline-none mt-1'
                type='password'
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default ResetPasswordInput;
