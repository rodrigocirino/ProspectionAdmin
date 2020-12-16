const db = require("../database");

class Prospectos {

    constructor(data, quente, id_cliente, id_vendedor) {
        this.data = data;
        this.quente = quente;
        this.id_cliente = id_cliente;
        this.id_vendedor = id_vendedor;
    }

    listar(params) {

        let sql = '';
        if (params!==undefined && params.id_vendedor)
            sql = "SELECT * FROM prospectos WHERE id_vendedor=" + parseInt(params.id_vendedor) + "";
        else
            sql = "SELECT * FROM prospectos LIMIT 100";

        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    cadastrar(params) {

        let sql = "INSERT INTO prospectos VALUES (DEFAULT, '" + params.data + "','" + (params.quente | 0) + "','" + params.id_cliente +  "','" + params.id_vendedor + "')";
        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    editar(params) {

        let sql = "UPDATE prospectos SET quente="+ (params.quente | 0) +" WHERE id="+ params.pid + "";
        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    remover(params) {

        console.log(params);

        let sql = "DELETE FROM prospectos WHERE id=" + params.pid + "";
        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

    listarJoin(params) {

        let sql = "SELECT *, " +
            " cli.nome as cnome, cli.email as cemail, cli.telefone as ctelefone, " +
            " ven.nome as vnome, ven.email as vemail, " +
            " pro.id as pid " +
            " FROM prospectos pro " +
            " INNER JOIN cliente cli on pro.id_cliente = cli.id " +
            " INNER JOIN vendedor ven on pro.id_vendedor = ven.id " +
            " WHERE ven.email = '"+params.id_vendedor+"' " +
            " ORDER BY pro.id";

        let promise = new Promise(function (resolve, reject) {
            db.query(sql, function (error, results, fields) {
                console.log('Query result is: ', results, sql, error);
                resolve(results);
            });
        });
        return promise;
    }

}

module.exports = Prospectos;