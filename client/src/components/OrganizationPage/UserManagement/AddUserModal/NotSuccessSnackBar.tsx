import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";
import { Portal } from "@mui/material";

interface IProps {
    isOpen: boolean,
    onClose: () => void
}

const UnSuccessSnackBar: React.FC<IProps> = ({ isOpen, onClose }) => {
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
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Sorry, email is invalid
                </Alert>
            </Snackbar>
        </Portal>
    )
}

export default UnSuccessSnackBar;