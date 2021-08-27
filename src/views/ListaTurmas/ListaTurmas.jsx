import React, {useEffect, useState} from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './ListaTurmas.css'
import {CircularProgress, Grid, List, TextField} from '@material-ui/core';
import ListaItem from '../../components/ListaItem/ListaItem';


const ListaTurmas = () => {
    const [spinner, setSpinner] = useState(true);
    const [turmas, setTurmas] = useState([]);
    const [turmasLista, setTurmasLista] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        carregaTurmas()
        setTimeout(()=>{
            setSpinner(false)
        },500)
    }, []);

    async function carregaTurmas() {
        const response = await fetch('/api/turmas/');
        const json = await response.json();

        setTurmasLista(json);
        setTurmas(json)
    }


    function buscaTurma(e) {
        const valorInput = e.target.value;
        let listaDeBusca = turmasLista.filter(turma =>
            turma.turma.includes(valorInput));
        if (valorInput == '') {
            setTurmas([...turmasLista]);
        }  else {
            setTurmas([...listaDeBusca]);
        }

    }

    function handle(e) {
        setSearchTerm(e.target.value);
    };

    function onChangeSearchbar(e) {
        handle(e);
        buscaTurma(e);
    }

    return (
        <div className={'page-lista-turmas'}>
            <Cabecalho link={'/'}/>
            <div className="container-lista-search">
                <TextField
                    autoComplete={'off'}
                    id="search-bar"
                    label="Buscar turma"
                    type="number"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={onChangeSearchbar}
                />
                <List className={'lista-turmas'}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {spinner && <CircularProgress className={'spinner'}/>}
                    </Grid>
                    {!spinner && turmas.map(turma => {
                        return <ListaItem key={turma.id} nome={turma.turma}
                        endpoint={'/detalhes-turma/'} queryId={turma.turma}/>;
                    })}
                </List>
            </div>
        </div>
    );
};

export default ListaTurmas;
