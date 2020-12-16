create table cliente
(
    id       int auto_increment
        primary key,
    nome     varchar(255) null,
    email    varchar(255) null,
    telefone varchar(50) null
);

create table vendedor
(
    id    int auto_increment
        primary key,
    nome  varchar(255) not null,
    email varchar(50)  not null,
    senha varchar(50)  not null
);

create table prospectos
(
    id          int auto_increment
        primary key,
    data        datetime null,
    quente      tinyint(1) null,
    id_cliente  int null,
    id_vendedor int null,
    constraint prospectos_cliente_id_fk
        foreign key (id_cliente) references cliente (id),
    constraint prospectos_vendedor_id_fk
        foreign key (id_vendedor) references vendedor (id)
);

