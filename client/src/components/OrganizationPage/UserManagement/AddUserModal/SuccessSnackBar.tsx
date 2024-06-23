import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";
import { Portal } from "@mui/material";

interface IProps {
    isOpen: boolean,
    onClose: () => void,
    text: string,
}

const SuccessSnackBar: React.FC<IProps> = ({ isOpen, text, onClose }) => {
    return (
        <Portal>
            <Snackbar
                open={isOpen}
                autoHideDuration={5000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={onClose}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {text}
                </Alert>
            </Snackbar>
        </Portal>
    )
}

export default SuccessSnackBar;