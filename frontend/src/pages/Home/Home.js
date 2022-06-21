import React, { useState } from "react";
import axios from "axios";
import { Button, Form }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import Card from "../../components/card";

export default function Home(){
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState('');
    const [msg, setMsg] = useState('');

    const handleSearch = ()=>{
        axios.get(`http://localhost:5000/getUser?estado=${query}`)
        .then(response =>{
            setUsers(response.data);
        });
    }
    const handleMsg= (e)=>{
        setMsg(e);
        handleSearch();
        setTimeout(()=>{
            setMsg('');
         },3000);
         
    }
    
    return(
        <div className="main">
            <h1> Pagina Principal</h1>
            <p>{msg}</p>
            <div className="pesquisa">
                <Form.Control 
                    placeholder="Digite o estado de pesquisa" 
                    name='nome'
                    type="text" 
                    onChange={(e)=> setQuery(e.target.value)}
                 />
                 <Button 
                    variant="primary"
                    onClick={handleSearch}
                 >
                    Pesquisar
                </Button>{' '}
                
            </div>
            <table className="table-index">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cpf</th>
                        <th>Cidade</th>
                    </tr>
                </thead>
                <tbody>
                    { typeof users === 'object' && users.map(value => {
                        return (
                            <Card 
                                key={value.cpf}
                                listUser={users}
                                setListUsers={setUsers}
                                id={value.id}
                                user = {value}
                                handleMsg = {handleMsg}
                               
                            />)
                    })}

                </tbody>
            </table>
        </div>
    );
}
