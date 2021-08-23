import React from 'react'
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import OpenCard from '@material-ui/icons/Launch';

const ListaItem = (props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.nome} secondary={`Turma: ${props.turma}`}/>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" data-id={props.idAluno}>
                    <OpenCard/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ListaItem
