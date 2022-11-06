DROP schema if exists lssDB;
create schema if not exists lssDB;
use lssDB;

create table if not exists users(
	username varchar(50) not null primary key,
	password varchar(100) not null,
	enabled boolean not null,
	uid int unique not null
);

create table if not exists authorities (
	username varchar(50) not null,
	authority varchar(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username));
	create unique index ix_auth_username on authorities (username,authority
);

insert into users (username, password, enabled, uid) values ('john', '$2a$10$KxTc8SYbIB/IaXCWz6NA4ug1pkAYM/e.P.0YQFGE3Ua4FZ6Qf842a', true, 1);
insert into users (username, password, enabled, uid) values ('kevin', '$2a$10$QPnaeWBWz1BdDglni2CLzO2YMeifVXtQDPgUOVNETTcj8cEGwqiym', true, 2);
insert into users (username, password, enabled, uid) values ('nelson', '$2a$10$Hc878CPLJ4hOtwyzt6V7..LHtzhcR3zqcXOAPseY9QGg05ZxcsTR6', true, 3);
insert into users (username, password, enabled, uid) values ("dieter","$2a$10$Kgcdc2WA0btkGTHTeS5fD.V3zgeHlYno9bmwRM/Lh1zhOgBBl8Q9G,",true,4);
insert into users (username, password, enabled, uid) values ("kyle","$2a$10$KtUhr6rd0P5Hv6W6m3wC/.eOI3RNHornW2BNKW/iXqNzpMRHch.vm",true,5);
insert into users (username, password, enabled, uid) values ("kennedy","$2a$10$RpR2cx3pBX.bY31wkouUc.PIALC40RY1fvEmd3dNuDMJuOpDWJdpG",true,6);
insert into users (username, password, enabled, uid) values ("yasir","$2a$10$duBSdZ0PfLuJxDil.FyN1OyuaanIBjxXXS4FrUeLpWC36hSnO85Nu",true,7);
insert into users (username, password, enabled, uid) values ("kelsie","$2a$10$rAzRt9jsCdgZoQ8ywC9JvumouRuKZfHvWAbWG8GRCF5851QUyLKY6",true,8);
insert into users (username, password, enabled, uid) values ("brody","$2a$10$qWrqW8cuogBHI7weIyQ8Tu9HJ3qUpuamnzTUjLCB222ZfvGEuG1ti",true,9);
insert into users (username, password, enabled, uid) values ("jack","$2a$10$nC1apwPsB5MNyUnj/0EvruysSsX33V3kSzFNBnp46y/cn.xYDc2T.",true,10);
insert into users (username, password, enabled, uid) values ("tallulah","$2a$10$/j0ZWYO0HOyaE3tKI0qTHusuWrxbbgnjD5llgNUGfWDCFEvfp6Lma",true,11);
insert into users (username, password, enabled, uid) values ("celeste","$2a$10$SaBSHezL4E1W4h5iZQUpq.KBa3EvxxUKh3HurnyxVOkj5hIY1JF4C",true,12);

insert into authorities (username, authority) values ('john.snow', 'ROLE_USER');
insert into authorities (username, authority) values ('kevin.strong', 'ROLE_USER');
insert into authorities (username, authority) values ('kevin.strong', 'ROLE_TEACHER');
insert into authorities (username, authority) values ('nelson', 'ROLE_USER');
insert into authorities (username, authority) values ('nelson', 'ROLE_TEACHER');
insert into authorities (username, authority) values ('nelson', 'ROLE_ADMIN');
insert into authorities (username, authority) values ('dieter', 'ROLE_USER');
insert into authorities (username, authority) values ('kyle', 'ROLE_USER');
insert into authorities (username, authority) values ('kennedy', 'ROLE_USER');
insert into authorities (username, authority) values ('yasir', 'ROLE_USER');
insert into authorities (username, authority) values ('kelsie', 'ROLE_USER');
insert into authorities (username, authority) values ('brody', 'ROLE_USER');
insert into authorities (username, authority) values ('jack', 'ROLE_USER');
insert into authorities (username, authority) values ('tallulah', 'ROLE_USER');
insert into authorities (username, authority) values ('celeste', 'ROLE_USER');
