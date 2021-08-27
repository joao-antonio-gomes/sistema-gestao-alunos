import React, {useEffect} from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import OpenCard from '@material-ui/icons/Launch';
import {Link, Route, Router, Switch} from 'react-router-dom';
import DetalhesAlunos from '../../views/DetalhesAlunos/DetalhesAlunos';

const ListaItem = (props) => {
    const {turma, nome, queryId, endpoint} = props;

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={nome} secondary={turma !== undefined ? `Turma: ${turma}` : ''}/>
            <ListItemSecondaryAction>
                <Link to={endpoint + queryId}>
                    <IconButton edge="end" aria-label="comments">
                        <OpenCard/>
                    </IconButton>
                </Link>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ListaItem;
