import React, {useEffect, useState} from 'react';
import './FormCadastro.css';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    makeStyles, MenuItem, Select,
    TextField,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import {Redirect, useHistory} from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import {DialogAlert} from '../../components/DialogAlert/DialogAlert';

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
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const FormCadastro = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Cadastro realizado com sucesso!');
    const [inputValue, setInputValue] = useState({
        nomeAluno: '',
        dataAniversario: '',
        turma: '',
        nomeResponsavel: '',
        telefoneResponsavel: '',
        telefoneEmergencia: '',
        obsAdicionais: '',
        responsavelRetirar: '',
        parentescoResponsavel: '',
        obsRestricao: '',
        checkRestricao: false,
        checkImagem: false,
    });

    const [inputRequire, setInputRequire] = useState({
        nomeAluno: false,
        dataAniversario: false,
        turma: false,
        nomeResponsavel: false,
        telefoneResponsavel: false,
        telefoneEmergencia: false,
        responsavelRetirar: false,
        parentescoResponsavel: false,
    });

    const history = useHistory();

    const handleHistory = () => {
        console.log(history);
    };

    const validaCamposPreenchidos = () => {
        let bool = true;
        let obj = {};
        const objOriginal = {...inputRequire};
        for (let inputRequireKey in inputRequire) {
            let input = document.querySelector(`input[name="` + inputRequireKey + `"]`);
            if (input.required && input.value === '') {
                obj = {
                    ...obj,
                    [inputRequireKey]: true,
                };
                bool = false;
            }
        }
        setInputRequire({...obj});
        setTimeout(() => {
            setInputRequire({...objOriginal});
        }, 3000);
        return bool;
    };

    const limpaFormulario = () => {
        let obj = {};
        for (let inputValueKey in inputValue) {
            let valor = '';
            if (inputValueKey === 'checkRestricao' || inputValueKey === 'checkImagem') {
                valor = false;
            }
            obj = {
                ...obj,
                [inputValueKey]: valor,
            };
        }
        setInputValue({...obj});
    };

    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            setInputValue({
                ...inputValue,
                [event.target.name]: event.target.checked,
            });
            return;
        }
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value,
        });
    };

    const cadastraAluno = (e) => {
        e.preventDefault();
        if (!validaCamposPreenchidos()) {
            return;
        }
        fetch('/api/alunos', {
            method: 'POST',
            body: JSON.stringify(inputValue),
        }).then(r => r.json())
            .then(response => {
                if (response.message == 'success') {
                    setOpen(true);
                }
            })

        setTimeout(() => {
            setRedirect(true);
            setOpen(false);
            limpaFormulario();
        }, 2000);
    };

    return (
        <div className={'form-cadastro'}>
            <Cabecalho link={'/'}/>
            <form className={classes.root} noValidate autoComplete="off" method={'POST'}>
                <TextField value={inputValue.nomeAluno}
                           onChange={handleChange}
                           name="nomeAluno"
                           label="Nome do Aluno"
                           size="small"
                           error={inputRequire.nomeAluno}
                           helperText={inputRequire.nomeAluno ? 'Campo obrigatório!' : ''}
                           required
                />
                <div className={'data-turma-group'}>
                    <TextField
                        value={inputValue.dataAniversario}
                        onChange={handleChange}
                        name="dataAniversario"
                        label="Data de Aniversário"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        required
                        error={inputRequire.dataAniversario}
                        helperText={inputRequire.dataAniversario ? 'Campo obrigatório!' : ''}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="turma"
                            required
                            error={inputRequire.turma}
                            helperText={inputRequire.turma ? 'Campo obrigatório!' : ''}
                        >Selecione uma turma:
                        </InputLabel>
                        <Select
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                getContentAnchorEl: null,
                            }}
                            inputProps={{
                                name: 'turma',
                            }}
                            value={inputValue.turma}
                            onChange={handleChange}
                            required
                            error={inputRequire.turma}
                            helperText={inputRequire.turma ? 'Campo obrigatório!' : ''}
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
                           required
                           error={inputRequire.nomeResponsavel}
                           helperText={inputRequire.nomeResponsavel ? 'Campo obrigatório!' : ''}
                           size="small"/>
                <TextField value={inputValue.telefoneResponsavel} name="telefoneResponsavel" onChange={handleChange}
                           label="Telefone Contato Responsável"
                           required
                           error={inputRequire.telefoneResponsavel}
                           helperText={inputRequire.telefoneResponsavel ? 'Campo obrigatório!' : ''}
                           size="small"/>
                <TextField value={inputValue.telefoneEmergencia} name="telefoneEmergencia" onChange={handleChange}
                           label="Telefone Contato Emergência"
                           required
                           error={inputRequire.telefoneEmergencia}
                           helperText={inputRequire.telefoneEmergencia ? 'Campo obrigatório!' : ''}
                           size="small"/>
                <TextField value={inputValue.obsAdicionais} name="obsAdicionais" onChange={handleChange}
                           label="Observações adicionais" size="small"/>
                <FormGroup>
                    <TextField value={inputValue.responsavelRetirar} name="responsavelRetirar" onChange={handleChange}
                               label="Nome do responsável para retirar"
                               required
                               error={inputRequire.responsavelRetirar}
                               helperText={inputRequire.responsavelRetirar ? 'Campo obrigatório!' : ''}
                               size="small"/>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="parentescoResponsavel"
                            required
                            error={inputRequire.parentescoResponsavel}
                            helperText={inputRequire.parentescoResponsavel ? 'Campo obrigatório!' : ''}
                        >
                            Parentesco do responsável para retirar:
                        </InputLabel>
                        <Select
                            inputProps={{
                                name: 'parentescoResponsavel',
                            }}
                            required
                            error={inputRequire.parentescoResponsavel}
                            helperText={inputRequire.parentescoResponsavel ? 'Campo obrigatório!' : ''}
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
                <div className={'form-cadastro-botoes'}>
                    <Button variant="contained"
                            color="secondary"
                            className={'botoes'}
                            onClick={limpaFormulario}
                            disableElevation>
                        Limpar
                    </Button>
                    <Button variant="contained"
                            type={'submit'}
                            color="primary"
                            className={'botoes'}
                            onClick={cadastraAluno}
                            disableElevation>
                        Cadastrar
                    </Button>
                </div>
            </form>
            <DialogAlert text={selectedValue} open={open}/>
            {redirect && <Redirect to={'/cadastro'}/>}
        </div>
    );
};

export default FormCadastro;
