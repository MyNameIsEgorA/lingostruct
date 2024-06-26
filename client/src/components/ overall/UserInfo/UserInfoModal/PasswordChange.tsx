import React, { useState } from 'react';
import ResetPasswordInput from './ResetPasswordInput';
import { resetPassword } from '@/api/user/resetPassword';
import { Portal } from '@mui/material';
import { Button } from '@mui/base';
import {Alert, Snackbar} from '@mui/material';

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
    const [response, setResponse] = useState<boolean | null>(null);
    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const makeRequest = async () => {
        const res: boolean = await resetPassword(oldPassword, newPassword, newPasswordConfirm);
        console.log(res);
        setResponse(res);
        setOpenSnack(true);
    };

    return (
        <div className='mt-5 flex flex-col'>
            <h4 className='text-gray-800 font-semibold text-[18px]'>
                Password Reset
            </h4>
            <h5 className='mt-1 text-gray-400'>
                To reset your password use form below
            </h5>
            <div className='mt-5 space-y-3 flex-grow'>
                <ResetPasswordInput value={oldPassword} setValue={setOldPassword} placeholder='Old Password' />
                <ResetPasswordInput value={newPassword} setValue={setNewPassword} placeholder='New Password' />
                <ResetPasswordInput value={newPasswordConfirm} setValue={setNewPasswordConfirm} placeholder='Confirm Password' />
            </div>
            <button className='mt-5 self-end px-3 py-2 bg-blue-500 text-white rounded-xl' onClick={makeRequest}>
                Reset Password
            </button>
            <Portal>
                <Snackbar
                    open={openSnack && response === true}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnack(false)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Alert
                        severity="success"    
                    >
                        Password changed
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openSnack && response === false}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnack(false)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Alert
                        severity="error"    
                    >
                        Error while handling your request
                    </Alert>
                </Snackbar>
            </Portal>
        </div>
    );
};

export default PasswordChange;