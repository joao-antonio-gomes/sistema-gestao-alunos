import React, {useEffect, useState} from 'react';
import InputMask from 'react-input-mask';
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
    const [helpText, setHelpText] = useState('Campo obrigatório!');
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

    const validaCamposPreenchidos = () => {
        let bool = true;
        let obj = {};
        const objOriginal = {...inputRequire};
        for (let inputRequireKey in inputRequire) {
            let input = document.querySelector(`input[name="` + inputRequireKey + `"]`);
            if (inputRequireKey == 'telefoneEmergencia' || inputRequireKey == 'telefoneResponsavel') {
                if (!filtraNumeroCelular(input)) {
                    obj = {
                        ...obj,
                        [inputRequireKey]: true,
                    };
                bool = false;
                }
            } else if (input.required && input.value === '') {
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

    function filtraNumeroCelular(input) {
        const numeroFiltrado = input.value.replace(/\D/g, '');
        console.log(numeroFiltrado);
        const ehValido = /\(?([0-9]{2,3})?\)?[0-9]{4,5}-?[0-9]{4}/.test(numeroFiltrado);
        return numeroFiltrado.length >= 11 && numeroFiltrado.length <= 12 && ehValido ;
    }

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
        e.stopPropagation();
        e.target.removeAttribute('enabled');
        e.target.setAttribute('disabled', 'disabled');

        if (!validaCamposPreenchidos()) {
            setTimeout(() => {
                e.target.removeAttribute('disabled');
                e.target.setAttribute('enabled', 'enabled');
            }, 3000);
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
            });

        setTimeout(() => {
            setOpen(false);
            limpaFormulario();
            setRedirect(true);
        }, 2000);
    };

    return (
        <div className={'form-cadastro'}>
            <Cabecalho link={'/'}/>
            <form className={classes.root} method={'POST'}>
                <TextField value={inputValue.nomeAluno}
                           inputProps={{
                               autoComplete: 'off',
                           }}
                           onChange={handleChange}
                           name="nomeAluno"
                           label="Nome do Aluno"
                           size="small"
                           error={inputRequire.nomeAluno}
                           helperText={inputRequire.nomeAluno ? helpText : ''}
                           required
                />
                <div className={'data-turma-group'}>
                    <TextField
                        value={inputValue.dataAniversario}
                        autoComplete={'off'}
                        onChange={handleChange}
                        name="dataAniversario"
                        label="Data de Aniversário"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        required
                        error={inputRequire.dataAniversario}
                        helperText={inputRequire.dataAniversario ? helpText : ''}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="turma"
                            required
                            error={inputRequire.turma}
                            helperText={inputRequire.turma ? helpText : ''}
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
                            helperText={inputRequire.turma ? helpText : ''}
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
                           autoComplete={'off'}
                           name="nomeResponsavel"
                           label="Nome do Responsável"
                           required
                           error={inputRequire.nomeResponsavel}
                           helperText={inputRequire.nomeResponsavel ? helpText : ''}
                           size="small"/>
                <TextField value={inputValue.telefoneResponsavel} name="telefoneResponsavel" onChange={handleChange}
                           label="Celular Contato Responsável"
                           required
                           autoComplete={'off'}
                    // onBlur={filtraNumeroCelular}
                           inputProps={{
                               pattern: '\\(?([0-9]{2,3})?\\)?[0-9]{4,5}-?[0-9]{4}',
                           }}
                           error={inputRequire.telefoneResponsavel}
                           helperText={inputRequire.telefoneResponsavel ? 'Favor preencher número com formato: DDD 9 XXXX-XXXX' : ''}
                           size="small"/>
                <TextField value={inputValue.telefoneEmergencia}
                           name="telefoneEmergencia"
                           autoComplete={'off'}
                    // onBlur={filtraNumeroCelular}
                            inputProps={{
                                pattern: '\\(?([0-9]{2,3})?\\)?[0-9]{4,5}-?[0-9]{4}',
                            }}
                           onChange={handleChange}
                           label="Celular Contato Emergência"
                           required
                           error={inputRequire.telefoneEmergencia}
                           helperText={inputRequire.telefoneEmergencia ? 'Favor preencher número com formato: DDD 9 XXXX-XXXX' : ''}
                           size="small"/>
                <TextField value={inputValue.responsavelRetirar} name="responsavelRetirar"
                           onChange={handleChange}
                           autoComplete={'off'}
                           label="Nome do responsável para retirar"
                           required
                           error={inputRequire.responsavelRetirar}
                           helperText={inputRequire.responsavelRetirar ? helpText : ''}
                           size="small"/>
                <TextField value={inputValue.parentescoResponsavel} name="parentescoResponsavel"
                           onChange={handleChange}
                           autoComplete={'off'}
                           label="Parentesco do responsável para retirar"
                           required
                           error={inputRequire.parentescoResponsavel}
                           helperText={inputRequire.parentescoResponsavel ? helpText : ''}
                           size="small"/>
                <TextField value={inputValue.obsAdicionais}
                           autoComplete={'off'} name="obsAdicionais" onChange={handleChange}
                           label="Observações adicionais" size="small"/>
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
                    <TextField value={inputValue.obsRestricao}
                               autoComplete={'off'} onChange={handleChange} name="obsRestricao"
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
            {redirect && <Redirect to={'/lista-alunos'}/>}
        </div>
    );
};

export default FormCadastro;
