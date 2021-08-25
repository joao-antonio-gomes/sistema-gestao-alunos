import {createServer} from 'miragejs';

function reformatDate(dateStr)
{
    let dArr = dateStr.split("-");  // ex input "2010-01-18"
    return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/10"
}

createServer({
    routes() {
        const alunos = [{
            id: 1,
            nomeAluno: 'João',
            dataAniversario: '04/12/2016',
            turma: '102',
            nomeResponsavel: 'Pai do João',
            telefoneResponsavel: '(48) 9 9942-5211',
            telefoneEmergencia: '',
            obsAdicionais: 'Muito avoado',
            responsavelRetirar: 'Pai e Mãe do João',
            parentescoResponsavel: 'Pais',
            obsRestricao: '',
            checkRestricao: false,
            checkImagem: true,
        },
            {
                id: 2,
                nomeAluno: 'Beltrana',
                dataAniversario: '21/07/2015',
                turma: '102',
                nomeResponsavel: 'Mãe da Beltrana',
                telefoneResponsavel: '(48) 9 8851-2222',
                telefoneEmergencia: '',
                obsAdicionais: '',
                responsavelRetirar: 'Padrinhos da Beltrana',
                parentescoResponsavel: 'Padrinhos',
                obsRestricao: 'Amendoim',
                checkRestricao: true,
                checkImagem: true,
            },
            {
                id: 3,
                nomeAluno: 'Fulano',
                dataAniversario: '14/03/2016',
                turma: '101',
                nomeResponsavel: 'Mãe do Fulano',
                telefoneResponsavel: '(47) 9 9532-8888',
                telefoneEmergencia: '',
                obsAdicionais: '',
                responsavelRetirar: 'Tios do Fulano',
                parentescoResponsavel: 'Tios',
                obsRestricao: 'Nozes',
                checkRestricao: true,
                checkImagem: false,
            }];

        this.namespace = '/api';

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
            const ultimoAdicionado = alunos[alunos.length - 1]
            const ultimoId = ultimoAdicionado.id;
            novoAluno.id = ultimoId + 1;

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
    }
})
