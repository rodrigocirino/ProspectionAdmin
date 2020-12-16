INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (8, 'Primeiro Cliente', 'primeiro@cliente.com', '41999998888');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (9, 'Segundo Cliente', 'segundo@cliente.com', '554133256565');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (10, 'Joao Novo', 'novo@email.com', '662255412541');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (11, 'Maria Jose', 'jose@maria.com', '415656895656565');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (12, 'Lindomar', 'lindo@mar.com', '554121214521');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (13, 'Sila', 'sila@nada.com', '55416985632');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (15, 'Geovana', 'geo@grafia.com', '554412544555');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (16, 'Lula da Silva', 'lula@dasilva.com', '131313131313');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (17, 'Doutor Pimpolho', 'doutor@pimpolho.com', '69696969696969');
INSERT INTO vendas.cliente (id, nome, email, telefone) VALUES (18, 'Silvio Santos', 'silvio@sbt.com', '551130004000');



INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (1, 'Primeiro Vendedor', 'primeiro@vendedor.com', '123');
INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (2, 'Segundo Vendedor', 'segundo@vendedor.com', '123');
INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (3, 'Rodrigo Cirino', 'rodrigo@email.com', '987654321');
INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (4, 'Marcia Botelho', 'marcia@botelho.com', '65784');
INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (5, 'Fulano de Tal', 'fulano@detal.com', '6598451');
INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (6, 'Chico da Princesa', 'chico@daprincesa.com', '55');
INSERT INTO vendas.vendedor (id, nome, email, senha) VALUES (7, 'João', 'joao@email.com', '123');



INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (45, '2020-12-01 00:00:00', 0, 8, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (46, '2020-12-17 00:00:00', 1, 9, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (47, '2020-12-19 00:00:00', 1, 10, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (48, '2021-01-06 00:00:00', 1, 11, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (49, '2021-01-15 00:00:00', 1, 11, 3);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (50, '2021-02-26 00:00:00', 1, 11, 4);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (51, '2021-02-26 00:00:00', 1, 8, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (52, '2021-03-12 00:00:00', 0, 12, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (53, '2021-04-22 00:00:00', 0, 15, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (54, '2020-11-17 00:00:00', 0, 15, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (55, '2020-11-17 00:00:00', 0, 17, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (56, '2020-08-20 00:00:00', 0, 16, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (58, '2020-03-17 00:00:00', 1, 18, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (59, '2020-03-17 00:00:00', 1, 15, 1);
INSERT INTO vendas.prospectos (id, data, quente, id_cliente, id_vendedor) VALUES (60, '2020-03-17 00:00:00', 1, 10, 1);