import React, {useState} from "react";
import axios from "axios";
import { Button }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModal from "../EditModal";
import './card.css';

export default function Card(props){

    const [open, setOpen] = useState(false);
    
  
    const handleEdit = ()=>{
        setOpen(true);
    }
    const handleRemove = ()=>{
        axios.delete(`http://localhost:5000/remove?cpf=${props.user.cpf}`)
        .then(response =>{
            props.handleMsg(response.data);
           
        })
    }
    return (
        <>
        <EditModal
        show={open}
        setOpen={setOpen}
        user={props.user}
        handleMsg={props.handleMsg}
        />
        <tr>
            <th>{props.user.nome}</th>
            <th>{props.user.email}</th>
            <th>{props.user.cpf}</th>
            <th>{props.user.cidade}</th>
            <th>
                <Button 
                    variant="warning"
                    onClick={handleEdit}
                 >
                    Editar
                </Button>{' '}
            </th>
            <th>
                <Button 
                    variant="danger"
                    onClick={handleRemove}
                 >
                    Remover
                </Button>{' '}
            </th>

        </tr>
        
        </>
    );
}