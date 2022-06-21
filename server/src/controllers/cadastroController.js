const User = require('../models/CadastroModel');

exports.cadastro = (req, res) =>{
    const user = new User(req.body);
    user.verUser(req.body.cpf).then(response =>{
        if(response) {
            res.send('Usuário com cpf já cadastrado!');
        }else{
            user.addUser().then(()=>{
                res.send('Usuário cadastrado!');
            })
        }
    }) 
}

exports.buscaDados = (req,res) =>{
    const user = new User();
    user.findUsers(req.query.estado).
    then((data)=>{
        res.send(data);
    });
    
    
}

exports.editarDados = (req,res) =>{
    const user = new User();
    user.editUser(req.query.cpf, req.body)
    .then(()=>{
        res.send(true);
    });
}

exports.removeUser = (req,res) =>{
    const user = new User();
    user.removeUser(req.query.cpf)
    .then(()=>{
        res.send('Usuário deletado com sucesso!');
    })
}