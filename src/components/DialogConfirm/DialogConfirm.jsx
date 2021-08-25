import React from 'react';
import './DialogConfirm.css'
import Dialog from '@material-ui/core/Dialog';
import {Button, DialogActions, Typography} from '@material-ui/core';


export function DialogConfirm(props) {

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={props.open}>
            <Typography variant={'h6'}>{props.text}</Typography>
            <Typography variant={'subtitle1'}>Aluno: {props.nomeAluno}</Typography>
            <Typography variant={'subtitle1'}>Matrícula: {props.id}</Typography>
            <DialogActions>
                <Button onClick={props.disagree} color="primary">
                    Cancelar
                </Button>
                <Button onClick={props.agree} color="primary" autoFocus>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}
