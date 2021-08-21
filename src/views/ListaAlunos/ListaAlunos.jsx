import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import './ListaAlunos.css'
import {CircularProgress, Grid, List, TextField} from '@material-ui/core'
import ListaItem from '../../components/ListaItem/ListaItem'


const ListaAlunos = () => {
    const [carregaLista, setLista] = useState(true)
    const [alunos, setAlunos] = useState([])
    const history = useHistory()

    const handleHistory = () => {
        history.push('/')
    }

    useEffect(() => {
        if (carregaLista) {
            setTimeout(()=>{
                fetch('/api/alunos')
                    .then(res => res.json())
                    .then(json => setAlunos(json))
                    .then(setLista(false))
                    .catch(err => console.log(err))
            },1000)
        }
    }, [carregaLista])

    return (
        <div className={'page-lista-alunos'}>
            <Cabecalho onClick={handleHistory}/>
            <div className="container-lista-search">
                <TextField id="search-bar" label="Buscar aluno" type="search" variant="outlined" size="small"/>
                <List className={'lista-alunos'}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                    {carregaLista && <CircularProgress />}
                    </Grid>
                    {alunos.map(el => {
                        return <ListaItem nome={el.nomeAluno} turma={el.turma}/>
                    })}
                </List>
            </div>
        </div>
    )
}

export default ListaAlunos
