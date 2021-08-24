import React, {useEffect, useState} from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './ListaAlunos.css';
import {CircularProgress, Grid, List, TextField} from '@material-ui/core';
import ListaItem from '../../components/ListaItem/ListaItem';


const ListaAlunos = () => {
    const [spinner, setSpinner] = useState(true);
    const [alunos, setAlunos] = useState([]);
    const [alunosLista, setAlunosLista] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (spinner) {
            setTimeout(async () => {
                const response = await fetch('/api/alunos/');
                const json = await response.json();
                setAlunos(json);
                setAlunosLista(json)
                setSpinner(false);
            }, 500);
        }
    }, [spinner]);


    function buscaAlunos(e) {
        const valorInput = e.target.value;
        let listaDeBusca = alunosLista.filter(aluno =>
            aluno.nomeAluno.toLowerCase().includes(valorInput.toLowerCase()));
        if (valorInput == '') {
            setAlunos([...alunosLista]);
        } else if (listaDeBusca.length === 0) {
            setAlunos([...alunosLista]);
        } else {
            setAlunos([...listaDeBusca]);
        }
    }

    function handle(e) {
        setSearchTerm(e.target.value);
    };

    function onChangeSearchbar(e) {
        handle(e);
        buscaAlunos(e);
    }

    return (
        <div className={'page-lista-alunos'}>
            <Cabecalho link={'/'}/>
            <div className="container-lista-search">
                <TextField
                    id="search-bar"
                    label="Buscar aluno"
                    type="search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={onChangeSearchbar}
                />
                <List className={'lista-alunos'}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {spinner && <CircularProgress className={'spinner'}/>}
                    </Grid>
                    {alunos.map(aluno => {
                        return <ListaItem key={aluno.id} nome={aluno.nomeAluno}
                                          turma={aluno.turma} idAluno={aluno.id}/>;
                    })}
                </List>
            </div>
        </div>
    );
};

export default ListaAlunos;
