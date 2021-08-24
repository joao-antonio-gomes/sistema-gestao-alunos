import React, {useEffect, useState} from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './ListaAlunos.css';
import {CircularProgress, Grid, List, TextField} from '@material-ui/core';
import ListaItem from '../../components/ListaItem/ListaItem';


const ListaAlunos = () => {
    const [carregaLista, setLista] = useState(true);
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        if (carregaLista) {
            setTimeout(async () => {
                const response = await fetch('/api/alunos/');
                const json = await response.json();
                setAlunos(json);
                setLista(false);
            }, 500);
        }
    }, [carregaLista]);


    return (
        <div className={'page-lista-alunos'}>
            <Cabecalho link={'/'}/>
            <div className="container-lista-search">
                <TextField id="search-bar" label="Buscar aluno" type="search" variant="outlined" size="small"/>
                <List className={'lista-alunos'}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {carregaLista && <CircularProgress className={'spinner'}/>}
                    </Grid>
                    {alunos.map(aluno => {
                        return <ListaItem nome={aluno.nomeAluno}
                                          turma={aluno.turma} idAluno={aluno.id}/>;
                    })}
                </List>
            </div>
        </div>
    );
};

export default ListaAlunos;
