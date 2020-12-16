var Cliente = require('./../models/cliente');

module.exports = function (app) {

    //GET LISTAR
    app.get('/api/cliente', function (req, res) {
        let resultado = new Cliente().listar(req.query).then(function (data) {
            if (data!=undefined && data.length)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    //POST CADASTRAR
    app.post('/api/cliente', function (req, res) {
        let email = {email: req.body.email};

        let resultado = new Cliente().listar(email).then(function (data) {
            if (data!=undefined && data.length)
                res.sendStatus(304); //JA CADASTRADO, NOT MODIFIED
            else {
                resultado = new Cliente().cadastrar(req.body).then(function (data) {
                    if (data !== undefined && data.affectedRows == 1)
                        res.status(200).send(data);
                    else
                        res.sendStatus(204);
                });
            }
        });

    });

    //PUT EDITAR
    app.put('/api/cliente', function (req, res) {
        let resultado = new Cliente().editar(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows >= 1)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    //DELETE REMOVER
    app.delete('/api/cliente', function (req, res) {
        let resultado = new Cliente().remover(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows >= 1)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

}
