import React from "react";
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MaskedInput (props){
    
    const limpaMask = (dado)=>{
        const unMask = dado.replace(/[^0-9]/g,'');
        props.setDado(unMask);
    }
    const chekaCep = ()=>{
        if(props.name !== 'cep') return;
        props.preencheEndereco();
    }
    
    return(
        <div className="form-group">
            <label className="label">Digite seu {props.name}</label>
            <InputMask
                name={props.name}
                className="form-control"
                mask={props.mask}
                onChange={event=>limpaMask(event.target.value)}
                onBlur={chekaCep}
            />
        </div>
    )
}