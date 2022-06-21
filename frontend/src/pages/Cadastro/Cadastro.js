import React, {useState} from "react";
import './Cadastro.css';
import Axios from 'axios';
import { Form, Button }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import MaskedInput from "../../components/MaskedInput/MaskedInput";
import axios from "axios";



export default function Cadastro () {

    const [user, setUser] = useState({
        estado: '',
        cidade: '',
        bairro: '',
        rua: ''
    });
    const [msg, setMsg] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] =  useState('');
    const [validated, setValidated] = useState(false);

    const estados = [];
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response =>{
        for (let aux of response.data){
            
            estados.push({ uf: aux.sigla, estado: aux.nome });
        };
    });
    
    const preencheEndereco = ()=>{
        if(!cep) return
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response =>{
            if(response.data.erro === 'true') {
                setMsg('Cep inválido!')
                return;
            }
            const estado = estados.find(element => element.uf === response.data.uf);
            setUser((prevValue) => ({
                ...prevValue,
                estado: estado.estado,
                cidade: response.data.localidade,
                bairro: response.data.bairro,
                rua: response.data.logradouro
            }));
            
        })   
    }
    
    const handleChangeValues = (value) =>{
        setUser((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setMsg('Escreva todos os campos do Formulário!')
        }else if(!cpf || !cep || !telefone){
                setMsg('Escreva todos os campos do Formulário!');
        } else {
                setValidated(true);
                console.log(user.cidade);
                    Axios.post('http://localhost:5000/register',{
                        nome: user.nome,
                        email: user.email,
                        cpf: cpf,
                        telefone: telefone,
                        cep: cep,
                        estado: user.estado,
                        cidade: user.cidade,
                        bairro: user.bairro,
                        rua: user.rua,
                        nrCasa: user.nrCasa,
                        infoEvent: user.infoEvent,
            
                    }).then((response)=>{
                        setMsg(response.data);
                    });
            


        }
        

    }

 

        return(
            <div className="main">
                <h1> Pagina de Cadastro</h1>
                
                <p>{msg}</p>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group  className="mb-3" >
                        <Form.Label>Nome Completo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nome"
                            onChange={handleChangeValues}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" >

                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            placeholder="exemplo@exemplo.com" 
                            type="email" 
                            name='email'
                            onChange={handleChangeValues}
                            required
                            
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                           
                        <MaskedInput
                            name="cpf"
                            setDado={setCpf}
                            mask={'999.999.999-99'}
                            
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >

                        <MaskedInput
                            name="telefone"
                            setDado={setTelefone}
                            mask={'(99) 99999-9999'}
                            
                            
                        />
                    </Form.Group>
                        <MaskedInput
                            name="cep"
                            setDado={setCep}
                            mask={'99-999-999'}
                            preencheEndereco={preencheEndereco}
                            
                        />
                    
                    <Form.Group className="mb-3" >

                        <Form.Label>Estado</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='estado'
                            value={user.estado}
                            onChange={handleChangeValues}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >

                        <Form.Label>Cidade</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='cidade'
                            value={user.cidade}
                            onChange={handleChangeValues}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >

                        <Form.Label>Bairro</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='bairro'
                            value={user.bairro}
                            onChange={handleChangeValues}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >

                        <Form.Label>Rua</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='rua'
                            value={user.rua}
                            onChange={handleChangeValues}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >

                        <Form.Label>Número da Casa</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='nrCasa'
                            onChange={handleChangeValues}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >

                        <Form.Label>Por onde ficou sabendo do Evento?</Form.Label>
                        <Form.Control 
                            name="infoEvent"
                            as="textarea" 
                            rows={3} 
                            onChange={handleChangeValues}
                            required
                        />
                        
                        
                    </Form.Group>
                                                            
                    <Button variant="primary" type="submit">
                            Cadastrar Usuário
                    </Button>
                </Form>
            </div>
        );


}
