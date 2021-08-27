import {createServer} from 'miragejs';
import { v4 } from 'uuid';

function reformatDate(dateStr)
{
    let dArr = dateStr.split("-");  // ex input "2010-01-18"
    return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/10"
}

createServer({
    routes() {
        let id = 6;

        const alunos = [
            {
            id: '1',
            nomeAluno: 'Ciclano Jr',
            dataAniversario: '04/12/2016',
            turma: '102',
            nomeResponsavel: 'Ciclano',
            telefoneResponsavel: '(48) 8 8888-4444',
            telefoneEmergencia: '',
            obsAdicionais: 'Muito avoado',
            responsavelRetirar: 'Ciclano',
            parentescoResponsavel: 'Pai',
            obsRestricao: '',
            checkRestricao: false,
            checkImagem: true,
        },
            {
                id: '2',
                nomeAluno: 'Beltrana',
                dataAniversario: '21/07/2015',
                turma: '101',
                nomeResponsavel: 'Maria Beltrana',
                telefoneResponsavel: '(48) 9 8851-2222',
                telefoneEmergencia: '',
                obsAdicionais: '',
                responsavelRetirar: 'Maria Beltrana',
                parentescoResponsavel: 'Mãe',
                obsRestricao: 'Amendoim',
                checkRestricao: true,
                checkImagem: true,
            },
            {
                id: '3',
                nomeAluno: 'Fulano',
                dataAniversario: '14/03/2016',
                turma: '101',
                nomeResponsavel: 'Juresmino',
                telefoneResponsavel: '(47) 9 9532-8888',
                telefoneEmergencia: '',
                obsAdicionais: '',
                responsavelRetirar: 'Juresmino',
                parentescoResponsavel: 'Transporte Escolar',
                obsRestricao: 'Nozes',
                checkRestricao: true,
                checkImagem: false,
            }];

        const turmas = [
            {
                id: '4',
                turma: '101',
            },
            {
                id: '5',
                turma: '102',
            },
            {
                id: '6',
                turma: '103',
            },
        ]

        this.namespace = '/api';

        // ====================== ALUNOS ====================== //
        this.get('/alunos', (schema, request) => {
            return alunos;
        })

        this.get('/alunos/:id', (schema, request) => {
            const id = request.params.id;
            const alunoFiltrado = alunos.filter(aluno => aluno.id == id);
            return alunoFiltrado;
        })

        this.post("/alunos", (schema, request) => {
            let novoAluno = JSON.parse(request.requestBody)
            id += 1;
            novoAluno.id = String(id);
            novoAluno.dataAniversario = reformatDate(novoAluno.dataAniversario)

            alunos.push(novoAluno);

            return ({'message': 'success'})
        })

        this.put("/alunos/:id", (schema, request) => {
            const id = Number(request.params.id);
            const posicaoAluno = alunos.findIndex(aluno => aluno.id == id);
            const alunoAtualizado = JSON.parse(request.requestBody);
            alunoAtualizado.dataAniversario = reformatDate(alunoAtualizado.dataAniversario)
            alunos[posicaoAluno] = alunoAtualizado;

            return ({'message': 'success'})
        })

        this.delete("/alunos/:id", (schema, request) => {
            const id = Number(request.params.id);
            const posicaoAluno = alunos.findIndex(aluno => aluno.id == id);
            alunos.splice(posicaoAluno, 1);

            return ({'message': 'success'})
        })
        // ====================== FIM ALUNOS ====================== //


        // ====================== TURMAS ====================== //
        this.get('/turmas', (schema, request) => {
            return turmas;
        })

        this.get('/turmas/:id', (schema, request) => {
            const turma = request.params.id;
            const alunosFiltrado = alunos.filter(aluno => aluno.turma == turma);
            return alunosFiltrado;
        })
        // ====================== FIM TURMAS ====================== //

    }
})
