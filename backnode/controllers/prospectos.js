var Prospectos = require('./../models/prospectos');

module.exports = function (app) {

    //GET LISTAR
    app.get('/api/prospectos', function (req, res) {
        let resultado = new Prospectos().listar(req.query).then(function (data) {
            if (data != undefined && data.length)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    app.get('/api/prospectos/join', function (req, res) {
        let resultado = new Prospectos().listarJoin(req.query).then(function (data) {
            if (data != undefined && data.length)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

    //POST CADASTRAR
    app.post('/api/prospectos', function (req, res) {
        let resultado = new Prospectos().cadastrar(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows == 1)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });

    });

    //PUT EDITAR
    app.put('/api/prospectos', function (req, res) {
        let resultado = new Prospectos().editar(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows >= 1) {
                res.status(200).send(data);
            } else
                res.sendStatus(204);
        });
    });

    //DELETE REMOVER
    app.delete('/api/prospectos', function (req, res) {
        let resultado = new Prospectos().remover(req.body).then(function (data) {
            if (data !== undefined && data.affectedRows >= 1)
                res.status(200).send(data);
            else
                res.sendStatus(204);
        });
    });

}
