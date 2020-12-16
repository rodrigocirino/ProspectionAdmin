var vendedor = require('./../models/vendedor');

module.exports = function (app) {

    //GET LISTAR
    app.post('/api/login', function (req, res) {
        let resultado = vendedor.login(req.body).then(function (data) {
            if (data!=undefined && data.length)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    //GET LISTAR
    app.get('/api/vendedor', function (req, res) {
        let resultado = vendedor.listar(req.query).then(function (data) {
            if (data!=undefined && data.length)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    //POST CADASTRAR
    app.post('/api/vendedor', function (req, res) {
        let email = {email: req.body.email};

        let resultado = vendedor.listar(email).then(function (data) {
            if (data!=undefined && data.length)
                res.sendStatus(304); //JA CADASTRADO, NOT MODIFIED
            else {
                resultado = vendedor.cadastrar(req.body).then(function (data) {
                    if (data !== undefined && data.affectedRows == 1)
                        res.status(200).send(data);
                    else
                        res.sendStatus(204);
                });
            }
        });

    });

    //PUT EDITAR
    app.put('/api/vendedor', function (req, res) {
        let resultado = vendedor.editar(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows >= 1)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    //DELETE REMOVER
    app.delete('/api/vendedor', function (req, res) {
        let resultado = vendedor.remover(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows >= 1)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

}
