import React, {useEffect} from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import OpenCard from '@material-ui/icons/Launch';
import {Link, Route, Router, Switch} from 'react-router-dom';
import DetalhesAlunos from '../../views/DetalhesAlunos/DetalhesAlunos';

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
                <Link to={'/detalhes-alunos/'+props.idAluno}>
                    <IconButton edge="end" aria-label="comments">
                        <OpenCard/>
                    </IconButton>
                </Link>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ListaItem;
