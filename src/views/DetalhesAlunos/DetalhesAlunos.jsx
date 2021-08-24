import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import {Avatar} from '@material-ui/core';

const DetalhesAlunos = (props) => {
    const params = useParams();
    const [alunoAtual, setAlunoAtual] = useState({});
    const aluno = alunoAtual[0];

    const carregaDetalhes = alunoAtual.length === 1 ? true : false;

    async function carregaDetalhesAluno() {
        const id = params.id;
        const response = await fetch(`/api/alunos/${id}`);
        const novoAluno = await response.json();
        setAlunoAtual(novoAluno);
    }

    useEffect(() => {
        carregaDetalhesAluno();
    }, []);

    return (
        <div>
            <div className="detalhes-aluno-page">
                <Cabecalho link={'/lista-alunos'}/>
                {carregaDetalhes &&
                <div className="detalhes-aluno-card">
                    <div className="header">
                        <Avatar style={{height: '70px', width: '70px', fontSize: '40px'}}>{aluno.nomeAluno[0]}</Avatar>
                        <div className="info-principal">
                            <p><strong>{aluno.nomeAluno}</strong></p>
                            <p>Turma <strong>{aluno.turma}</strong></p>
                            <p>Data Aniversário: <strong>{aluno.dataAniversario}</strong></p>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default DetalhesAlunos;
