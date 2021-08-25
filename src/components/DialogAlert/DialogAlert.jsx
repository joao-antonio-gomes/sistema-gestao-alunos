import React from 'react';
import './DialogAlert.css'
import Dialog from '@material-ui/core/Dialog';
import {Typography} from '@material-ui/core';


export function DialogAlert(props) {

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={props.open}>
            <Typography variant={'h6'}>{props.text}</Typography>
        </Dialog>
    );
}
