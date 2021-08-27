import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './DetalhesTurma.css';
import {Avatar, Button, CircularProgress, Grid} from '@material-ui/core';
import {DialogConfirm} from '../../components/DialogConfirm/DialogConfirm';

const DetalhesAlunos = (props) => {
    const [spinner, setSpinner] = useState(true);
    const params = useParams();
    const [turma, setTurma] = useState({});
    const [carregaDetalhes, setCarregaDetalhes] = useState(false);
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    function carregaDetalhesTurma() {
        const id = params.id;

        fetch(`/api/turmas/${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(alunos => {
                setTurma(alunos);
                setCarregaDetalhes(true);
            })
    }

    useEffect(() => {
        carregaDetalhesTurma();
    }, []);

    async function excluirTurma() {
        const id = params.id;
        const response = await fetch(`/api/turmas/${id}`, {
            method: 'DELETE',
        });
        const msg = await response.json();

        if (msg.message == 'success') {
            setOpen(false);
            setRedirect(true)
        }
    }

    return (
        <div>
            <div className="detalhes-turma-page">
                <Cabecalho link={'/lista-turmas'}/>
                {carregaDetalhes &&
                <div className={'detalhes-turma-card'}>
                    <div className="header-card">
                        <div className="turma-header-info">
                            <p><strong>Turma {params.id}</strong></p>
                        </div>
                    </div>
                    <div className="turma-card-info">
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/*{spinner && <CircularProgress className={'spinner'}/>}*/}
                        </Grid>

                        <table>
                            <thead>
                            <th>
                                Matrícula
                            </th>
                            <th>
                                Aluno
                            </th>
                            </thead>
                            <tbody>
                            {carregaDetalhes && turma.map(aluno => {
                                return (
                                    <tr>
                                        <td>
                                            {aluno.id}
                                        </td>
                                        <td>
                                            {aluno.nomeAluno}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    {/*    <div className={'form-cadastro-botoes'}>
                            <Button variant="contained"
                                    color="secondary"
                                    className={'botoes-detalhe-turma'}
                                    onClick={() => {
                                        setOpen(true)}
                                    }
                                    disableElevation>
                                <p className={'link-botao-editar'}>
                                    Excluir
                                </p>
                            </Button>
                            <Button variant="contained"
                                    type={'submit'}
                                    color="primary"
                                    className={'botoes-detalhe-turma'}
                                    disableElevation>
                                <Link className={'link-botao-editar'} to={'/form-edit/' + turma.id}>
                                    Editar
                                </Link>
                            </Button>
                        </div>*/}
                    </div>
{/*                    <DialogConfirm
                        text={'Tem certeza que gostaria de excluir o aluno abaixo?'}
                        open={open}
                        nomeAluno={turma.nomeAluno}
                        id={turma.id}
                        agree={excluirTurma}
                        disagree={() => {
                            setOpen(false)}
                        }
                    />
                    {redirect && <Redirect to={'/lista-alunos'}/>}*/}
                </div>}
            </div>

        </div>
    );
};

export default DetalhesAlunos;
