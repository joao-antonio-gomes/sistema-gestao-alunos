import React, {useEffect, useState} from 'react'
import './App.css'
import FormCadastro from './FormCadastro/FormCadastro'
import ListaAlunos from './ListaAlunos/ListaAlunos'
import {Button} from '@material-ui/core'
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from 'react-router-dom'
import DetalhesAlunos from './DetalhesAlunos/DetalhesAlunos'
import FormEdit from './FormEdit/FormEdit'
import '../server/server';
import {logDOM} from '@testing-library/react'

export const App = props => {
    const [movies, setMovies] = useState(null)


    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                        <div className={'pag-inicial'}>
                            <Link to={'/cadastro'}>
                                <Button variant="contained"
                                        color="primary"
                                        className="botoes-home botao-primario"
                                        disableElevation>
                                    Cadastrar novo aluno
                                </Button>
                            </Link>
                            <Link to={'/lista-alunos'}>
                                <Button variant="contained"
                                        color="secondary"
                                        className="botoes-home botao-secundario"
                                        disableElevation>
                                    Lista de alunos
                                </Button>
                            </Link>
                        </div>
                    </Route>

                    <Route exact path={'/cadastro'}>
                        <FormCadastro/>
                    </Route>

                    <Route exact path={'/lista-alunos'}>
                        <ListaAlunos/>
                    </Route>

                    <Route exact path={'/detalhes-alunos/:id'}>
                        <DetalhesAlunos/>
                    </Route>

                    <Route exact path={'/form-edit'}>
                        <FormEdit/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
