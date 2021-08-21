import React, {useState} from 'react'
import './FormCadastro.css'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    makeStyles, MenuItem, Select,
    TextField
} from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import {Switch, useHistory} from 'react-router-dom'
import Cabecalho from '../../components/Cabecalho/Cabecalho'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '95vw',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formControlCheck: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))

const FormCadastro = () => {
    const classes = useStyles()
    const [inputValue, setInputValue] = useState({
        nomeAluno: '',
        dataAniversario: '',
        turma: ``,
        nomeResponsavel: '',
        telefoneResponsavel: '',
        telefoneEmergencia: '',
        obsAdicionais: '',
        responsavelRetirar: '',
        parentescoResponsavel: '',
        obsRestricao: '',
        checkRestricao: false,
        checkImagem: false,
    })

    const history = useHistory()

    const handleHistory = () => {
        history.push('/')
    }

    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            setInputValue({
                ...inputValue,
                [event.target.name]: event.target.checked
            })
            return
        }
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value
        })
    }

    const imprimeInputValue = () => {
        fetch('/api/alunos', {
            method: 'PUT',
            body: JSON.stringify(inputValue)
        })

        console.log(inputValue)

        setTimeout(()=>{
            fetch('/api/alunos')
                .then(res => res.json())
                .then(console.log)
                .catch(err => console.log(err))
        },1000)
    }
    return (
        <div className={'form-cadastro'}>
            <Cabecalho onClick={handleHistory}/>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField value={inputValue.nomeAluno}
                           onChange={handleChange}
                           name="nomeAluno"
                           label="Nome do Aluno"
                           size="small"/>
                <div className={'data-turma-group'}>
                    <TextField
                        value={inputValue.dataAniversario}
                        onChange={handleChange}
                        name="dataAniversario"
                        label="Data de Aniversário"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="turma">Selecione uma turma:</InputLabel>
                        <Select
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left'
                                },
                                getContentAnchorEl: null,
                            }}
                            inputProps={{
                                name: 'turma',
                                id: 'turma',
                            }}
                            value={inputValue.turma}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}><em>None</em></MenuItem>
                            <MenuItem value={101}>101</MenuItem>
                            <MenuItem value={102}>102</MenuItem>
                            <MenuItem value={103}>103</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TextField value={inputValue.nomeResponsavel}
                           onChange={handleChange}
                           name="nomeResponsavel"
                           label="Nome do Responsável"
                           size="small"/>
                <TextField value={inputValue.telefoneResponsavel} name="telefoneResponsavel" onChange={handleChange}
                           label="Telefone Contato Responsável"
                           size="small"/>
                <TextField value={inputValue.telefoneEmergencia} name="telefoneEmergencia" onChange={handleChange}
                           label="Telefone Contato Emergência"
                           size="small"/>
                <TextField value={inputValue.obsAdicionais} name="obsAdicionais" onChange={handleChange}
                           label="Observações adicionais" size="small"/>
                <FormGroup>
                    <TextField value={inputValue.responsavelRetirar} name="responsavelRetirar" onChange={handleChange}
                               label="Nome do responsável para retirar"
                               size="small"/>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="parentescoResponsavel">Parentesco do responsável para
                            retirar:</InputLabel>
                        <Select
                            inputProps={{
                                name: 'parentescoResponsavel',
                            }}
                            onChange={handleChange}
                            value={inputValue.parentescoResponsavel}
                        >
                            <MenuItem value={''}><em>None</em></MenuItem>
                            <MenuItem value={'pais'}>Pais</MenuItem>
                            <MenuItem value={'tios'}>Tios</MenuItem>
                            <MenuItem value={'avos'}>Avós</MenuItem>
                            <MenuItem value={'padrinhos'}>Padrinhos</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup className={classes.formControlCheck}>
                    <FormLabel className={'checkbox-format'} component="legend">O aluno possui restrição
                        alimentar?</FormLabel>
                    <FormControlLabel
                        control={<Checkbox
                            checked={inputValue.checkRestricao} onChange={handleChange}
                            name="checkRestricao" color={'primary'}/>}
                    />
                </FormGroup>
                <Collapse in={inputValue.checkRestricao}>
                    <TextField value={inputValue.obsRestricao} onChange={handleChange} name="obsRestricao"
                               label="obsRestricao" size="small"/>
                </Collapse>
                <FormGroup className={classes.formControlCheck}>
                    <FormLabel className={'checkbox-format'} component="legend">Autorização de fotos e vídeos da
                        para uso de
                        imagem?</FormLabel>
                    <FormControlLabel
                        control={<Checkbox checked={inputValue.checkImagem} onChange={handleChange} name="checkImagem"
                                           color={'primary'}/>}
                    />
                </FormGroup>

            </form>
            <div className={'form-cadastro-botoes'}>
                <Button variant="contained"
                        color="secondary"
                        className={'botoes'}
                        onClick={imprimeInputValue}
                        disableElevation>
                    Limpar
                </Button>
                <Button variant="contained"
                        color="primary"
                        className={'botoes'}
                        disableElevation>
                    Cadastrar
                </Button>
            </div>
        </div>
    )
}

export default FormCadastro
