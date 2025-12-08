import {useState} from "react";
import {Snackbar} from "@mui/material";

interface NotificationElementProps{
    message:string
}

export function NotificationElement({message}:NotificationElementProps){
    const [open, setOpen] = useState(true);

    return (
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={() => setOpen(false)}
            message={message}
        />
    );
}