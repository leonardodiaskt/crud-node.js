const mysql = require('mysql2');
const express = require('express');

const porta = 3103;


const app = express();
app.use(express.json())

function insereDados(dados){
    return `INSERT INTO CADASTRA_ALUNOS (NOME, CPF, IDADE, MATRICULA) VALUES ("${dados['NOME']}", "${dados['CPF']}", ${dados['IDADE']}, "${dados['matricula']}")`
}

function atualizaDados(index, coluna, up){
    return `UPDATE CADASTRA_ALUNOS SET ${coluna} = "${up}" WHERE id = ${index}`
}

function deletaDados(index){
    return `DELETE FROM CADASTRA_ALUNOS WHERE ID = ${index}`
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ESCOLA',
    port: '3306'
});

//GET

app.get('/', function (req, res) {

    var dados = 'SELECT * FROM CADASTRA_ALUNOS'
    connection.query(dados, function(err, result){
      if(err) throw err
      console.log(result)
      res.json(result)
    })       
  })

//POST

app.post('/', function(req, res){
    console.log(req.body)
    connection.query(insereDados(req.body), function(err, result){
        if (err) throw err
        res.status(200).send("Dados Adicionados")
    })
})

//PUT

app.put('/:id', function(req, res){
    const index = req.params.id
    const up = req.body
    for(let prop in up){
         connection.query(atualizaDados(index, prop, up[prop]), function(err, result){
            if (err) throw err
        })
    }
    res.status(200).send("Dados Atualizados")
});
 
//DELETE

app.delete('/:id', function(req, res){
    let index = req.params.id
    connection.query(deletaDados(index), function(err, result){
        if (err) throw err
        res.status(200).send("Dados Excluídos")
    })
});

app.listen(porta, () => {
    console.log("Servidor rodando")
})