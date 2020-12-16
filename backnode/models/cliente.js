const db = require("../database");

class Cliente {

    constructor(name, email, telefone) {
        this.name = name;
        this.email = email;
        this.telefone = telefone;
    }

    listar(params) {

        let sql = '';
        if (params!==undefined && params.email)
            sql = "SELECT * FROM cliente WHERE email ='" + params.email + "'";
        else
            sql = "SELECT * FROM cliente LIMIT 100";

        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    cadastrar(params) {

        let sql = "INSERT INTO cliente VALUES (DEFAULT,'" + params.nome + "','" + params.email + "','" + params.telefone + "')";
        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    editar(params) {

        let sql = "UPDATE cliente SET nome='" + params.nome + "', telefone='" + params.telefone + "' WHERE email='" + params.email + "'";
        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    remover(params) {

        let sql = "DELETE FROM cliente WHERE email='" + params.email + "'";
        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

}

module.exports = Cliente;