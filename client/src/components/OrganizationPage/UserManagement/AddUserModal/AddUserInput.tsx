import { emailValidation } from '@/helpers/validations';
import React from 'react';
import { useState, useEffect } from 'react';
import SuccessSnackBar from './SuccessSnackBar';
import UnSuccessSnackBar from './NotSuccessSnackBar';

interface IProps {
    onRequestClose: () => void;
}

const AddUserInput: React.FC<IProps> = ({ onRequestClose }) => {

    const [userEmail, setUserEmail] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeEmail(e)
        setOpenSnackBar(false)
    }

    useEffect(() => {
        setError(userEmail !== "" && !emailValidation(userEmail));
    }, [userEmail]);

    return (
        <div className='mt-5'>
            <h6 className='text-gray-900'>Invite members</h6> 
            <input
                value={userEmail}
                onChange={onChangeInput}
                className='mt-2 w-full px-[14px] py-[10px] bg-gray-200 rounded-lg outline-none text-gray-900'
                placeholder='Add project members by email...'
            />
            {error && <div className='text-[12px] text-red-600 ml-[10px]' mt-1>Sorry this isn't an email</div>}
            <div className='flex mt-8 space-x-3 justify-end'>
                <button onClick={() => {
                    onRequestClose
                    setOpenSnackBar(true)
                }} 
                className='rounded-lg py-3 px-8 bg-blue-600 text-white'>Invite</button>
                <button onClick={onRequestClose} className='bg-gray-100 rounded-lg py-3 px-8'>Cancel</button>
            </div>
            <SuccessSnackBar
                isOpen={!error && openSnackBar}
                text={`User ${userEmail} was invited to the project`}
                onClose={() => {setOpenSnackBar(false)}}
                />
            <UnSuccessSnackBar 
                isOpen={error && openSnackBar}
                onClose={() => setOpenSnackBar(false)}
            />
        </div>
    );
}

export default AddUserInput;