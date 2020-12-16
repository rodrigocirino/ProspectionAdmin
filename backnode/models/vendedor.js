var db = require("../database");

function login(params) {

    let sql = "SELECT * FROM vendedor WHERE email ='" + params.email + "' AND senha = '" + params.senha + "'";
    let promise = new Promise(function (resolve, reject) {
        db.query(sql, function (error, results, fields) {
            //if (error) throw error;
            console.log('Query result is: ', results, sql, error);
            resolve(results);
        });
    });
    return promise;
}

function listar(params) {

    let sql = '';
    if (params!==undefined && params.email)
        sql = "SELECT * FROM vendedor WHERE email ='" + params.email + "'";
    else
        sql = "SELECT * FROM vendedor LIMIT 100";

    let promise = new Promise(function (resolve, reject) {
        db.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log('Query result is: ', sql, error);
            resolve(results);
        });
    });
    return promise;
}

function cadastrar(params) {

    let sql = "INSERT INTO vendedor VALUES (DEFAULT,'" + params.nome + "','" + params.email + "','" + params.senha + "')";
    let promise = new Promise(function (resolve, reject) {
        db.query(sql, function (error, results, fields) {
            //if (error) throw error;
            console.log('Query result is: ', results, sql, error);
            resolve(results);
        });
    });
    return promise;
}

function editar(params) {

    let sql = "UPDATE vendedor SET nome='"+params.nome+"', senha='"+params.senha+"' WHERE id='"+params.id+"'";
    let promise = new Promise(function (resolve, reject) {
        db.query(sql, function (error, results, fields) {
            //if (error) throw error;
            console.log('Query result is: ', results, sql, error);
            resolve(results);
        });
    });
    return promise;
}

function remover(params) {

    let sql = "DELETE FROM vendedor WHERE id='"+params.id+"'";
    let promise = new Promise(function (resolve, reject) {
        db.query(sql, function (error, results, fields) {
            //if (error) throw error;
            console.log('Query result is: ', results, sql, error);
            resolve(results);
        });
    });
    return promise;
}

module.exports.remover = remover;
module.exports.editar = editar;
module.exports.listar = listar;
module.exports.cadastrar = cadastrar;
module.exports.login = login;