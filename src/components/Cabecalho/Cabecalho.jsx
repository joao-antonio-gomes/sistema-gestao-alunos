import React from 'react'
import './Cabecalho.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const Cabecalho = (props) => {
    return (
        <div className={'cabecalho'}>
            <div onClick={props.onClick}>
                <ArrowBackIcon className={'icone-voltar'}/>
            </div>
        </div>
    )
}

export default Cabecalho
