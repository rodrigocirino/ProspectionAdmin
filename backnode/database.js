var mysql = require('mysql');

var connection = mysql.createPool({
    /*
    *       SE USA DOCKER COMPOSE
    *       HOST DEVE SER O MESMO NOME DA IMAGEM CRIADA
    *       bash$ docker image ls my*
    *
    *       PS (NÃO CONFUNDIR COM O NOME DO CONTAINER OU DO APP)
    *
    *
    * */
    host: 'mysql',//NOME DA IMAGEM DO DOCKER-COMPOSE
    user: 'root',
    password: 'mysql',
    database: 'vendas',
    connectionLimit: 10,
    debug: false
});

module.exports = connection;

// ERRO COMUM AO RODAR QUERYS EM CLIENTES PHP E NODE
// # ALTER USER root IDENTIFIED WITH mysql_native_password BY 'mysql';
/*
connection.connect();
connection.query('SELECT * FROM cliente', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});
connection.end();
*/
