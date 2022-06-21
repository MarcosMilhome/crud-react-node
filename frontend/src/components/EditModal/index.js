import React, { useState } from "react";
import axios from "axios";

import { Modal, Button, Form, Alert }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditModal(props){
    
    const query = props.user.cpf;
    const [validated, setValidated] = useState(false);
    const [msg, setMsg] = useState('');



    const [editValues, setEditValues] = useState({
        nome: props.user.nome,
        email:props.user.email,
        telefone: props.user.telefone,
        cep: props.user.cep,
        estado: props.user.estado,
        cidade: props.user.cidade,
        bairro: props.user.bairro,
        rua: props.user.rua,
        nrCasa: props.user.nrCasa

    });

    const handleSubmit = (e)=>{
   
      const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
            setMsg('Preencha todos os campos!')
        }else{
          setMsg('');
          setValidated(true);
          axios.put(`http://localhost:5000/edit?cpf=${query}`,{
            nome: editValues.nome,
            email:editValues.email,
            telefone: editValues.telefone,
            cep: editValues.cep,
            estado: editValues.estado,
            cidade: editValues.cidade,
            bairro:editValues.bairro,
            rua: editValues.rua,
            nrCasa: editValues.nrCasa
            }).then(response =>{
                if(response.data){
                  props.handleMsg('Usuário Editado com Sucesso!')  ;
                  handleClose();
                }
            }).catch(e=>{
            });
  
        }
      }

    const handleChangeValues = (value) =>{
        setEditValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    const handleClose = () =>{
        props.setOpen(false)
    } 

    return (
        <>
      
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        
          <Alert variant="danger">{msg} </Alert>
        <Modal.Body>
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                name='nome'
                type="text"
                defaultValue={props.user.nome}
                onChange={handleChangeValues}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name='email'
                type="text"
                onChange={handleChangeValues}
                defaultValue={props.user.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                required
                name='telefone'
                type="number"
                onChange={handleChangeValues}
                defaultValue={props.user.telefone}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Cep</Form.Label>
              <Form.Control
                required
                name='cep'
                type="number"
                onChange={handleChangeValues}
                defaultValue={props.user.cep}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Estado</Form.Label>
              <Form.Control
                required
                name='estado'
                type="text"
                onChange={handleChangeValues}
                defaultValue={props.user.estado}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                required
                name='cidade'
                type="text"
                onChange={handleChangeValues}
                defaultValue={props.user.cidade}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                required
                name='rua'
                type="text"
                onChange={handleChangeValues}
                defaultValue={props.user.bairro}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Rua</Form.Label>
              <Form.Control
                required
                name='rua'
                type="text"
                onChange={handleChangeValues}
                defaultValue={props.user.rua}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Número da Casa</Form.Label>
              <Form.Control
                required
                name='nrCasa'
                type="number"
                onChange={handleChangeValues}
                defaultValue={props.user.nrCasa}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Salvar Alterações
              </Button>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        

      </Modal>
    </>
      );
}