import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './DetalhesAlunos.css';
import {Avatar, Button, CircularProgress, Grid} from '@material-ui/core';
import {DialogConfirm} from '../../components/DialogConfirm/DialogConfirm';

const DetalhesAlunos = (props) => {
    const [spinner, setSpinner] = useState(true);
    const params = useParams();
    const [aluno, setAluno] = useState({});
    const [carregaDetalhes, setCarregaDetalhes] = useState(false);
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    function carregaDetalhesAluno() {
        const id = params.id;

        fetch(`/api/alunos/${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(novoAluno => {
                setAluno(novoAluno[0]);
                setCarregaDetalhes(true);
            })
    }

    useEffect(() => {
        carregaDetalhesAluno();
    }, []);

    async function excluirAluno() {
        const id = params.id;
        const response = await fetch(`/api/alunos/${id}`, {
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
            <div className="detalhes-aluno-page">
                <Cabecalho link={'/lista-alunos'}/>
                {carregaDetalhes &&
                <div className={'detalhes-aluno-card'}>
                    <div className="header-card">
                        <Avatar style={{height: '70px', width: '70px', fontSize: '40px'}}>{aluno.nomeAluno[0]}</Avatar>
                        <div className="aluno-header-info">
                            <p><strong>{aluno.nomeAluno}</strong></p>
                        </div>
                    </div>
                    <div className="aluno-card-info">
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/*{spinner && <CircularProgress className={'spinner'}/>}*/}
                        </Grid>

                        <table>
                            <tbody>
                            <tr>
                                <td>Matrícula:</td>
                                <td>{aluno.id}</td>
                            </tr>
                            <tr>
                                <td>Data de Aniversário:</td>
                                <td>{aluno.dataAniversario}</td>
                            </tr>
                            <tr>
                                <td>Nome Responsável:</td>
                                <td>{aluno.nomeResponsavel}</td>
                            </tr>
                            <tr>
                                <td>Telefone Responsável:</td>
                                <td>{aluno.telefoneResponsavel}</td>
                            </tr>
                            <tr>
                                <td>Telefone Emergência:</td>
                                <td>{aluno.telefoneEmergencia}</td>
                            </tr>
                            <tr>
                                <td>Responsável para Buscar:</td>
                                <td>{aluno.responsavelRetirar} - {aluno.parentescoResponsavel}</td>
                            </tr>
                            {aluno.checkRestricao &&
                            <tr>
                                <td>Restrição Alimentar:</td>
                                <td>{aluno.obsRestricao}</td>
                            </tr>}
                            <tr>
                                <td>Autorização de Imagem:</td>
                                <td>{aluno.checkImagem ? 'Sim' : 'Não'}</td>
                            </tr>
                            {aluno.obsAdicionais !== '' &&
                            <tr>
                                <td>Observações:</td>
                                <td>{aluno.obsAdicionais}</td>
                            </tr>}
                            </tbody>
                        </table>
                        <div className={'form-cadastro-botoes'}>
                            <Button variant="contained"
                                    color="secondary"
                                    className={'botoes-detalhe-aluno'}
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
                                    className={'botoes-detalhe-aluno'}
                                    disableElevation>
                                <Link className={'link-botao-editar'} to={'/form-edit/' + aluno.id}>
                                    Editar
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <DialogConfirm
                        text={'Tem certeza que gostaria de excluir o aluno abaixo?'}
                        open={open}
                        nomeAluno={aluno.nomeAluno}
                        id={aluno.id}
                        agree={excluirAluno}
                        disagree={() => {
                            setOpen(false)}
                        }
                    />
                        {redirect && <Redirect to={'/lista-alunos'}/>}
                </div>}
            </div>

        </div>
    );
};

export default DetalhesAlunos;
