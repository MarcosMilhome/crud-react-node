const mongoose = require('mongoose');
const { cadastro } = require('../controllers/cadastroController');

const cadastroSchema = new mongoose.Schema({

    nome: {type: String, required: true},
    email:{type: String, required: true},
    cpf: {type: String, required: true},
    telefone: {type: String, required: true},
    cep: {type: String, required: true},
    estado: {type: String, required: true},
    cidade: {type: String, required: true},
    bairro: {type: String, required: true},
    rua: {type: String, required: true},
    nrCasa: {type: String, required: true},
    infoEvent: {type: String, required: true}
});

const cadastroModel  = mongoose.model('Usuarios', cadastroSchema);

class User{
    constructor(body){
        this.body=body;
    }

    addUser(){
        return cadastroModel.create({
            nome: String(this.body.nome),
            email: String(this.body.email),
            cpf: String(this.body.cpf),
            telefone: String(this.body.telefone),
            cep: String(this.body.cep),
            estado: String(this.body.estado),
            cidade: String(this.body.cidade),
            bairro: String(this.body.bairro),
            rua: String(this.body.rua),
            nrCasa: String(this.body.nrCasa),
            infoEvent: String(this.body.infoEvent),

        });
    }
    findUsers(value){
        return cadastroModel.find({estado: value})
        .then((data)=>{
            return data;
        })
    }
    verUser(cpf){
        return cadastroModel.findOne({cpf: cpf})
        .then(data=>{
            if(data) return true;
            return false;
        })
    }
    removeUser(cpf){
        return cadastroModel.deleteOne({cpf: cpf});
    }
    editUser(cpf,obj){
        return cadastroModel.updateOne({cpf: cpf},{
            nome: String(obj.nome),
            email: String(obj.email),
            telefone: String(obj.telefone),
            cep: String(obj.cep),
            estado: String(obj.estado),
            cidade: String(obj.cidade),
            bairro: String(obj.bairro),
            rua: String(obj.rua),
            nrCasa: String(obj.nrCasa),
            infoEvent: String(obj.infoEvent),

        })
    }
    
}

module.exports = User;
