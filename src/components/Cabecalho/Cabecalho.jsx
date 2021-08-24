import React from 'react';
import './Cabecalho.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

const Cabecalho = (props) => {
    return (
        <div className={'cabecalho'}>
            <Link to={props.link}>
                <div onClick={props.onClick}>
                    <ArrowBackIcon className={'icone-voltar'}/>
                </div>
            </Link>
        </div>
    );
};

export default Cabecalho;
