
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
  username      varchar(20) not null, 
  password      varchar(100) not null,
  primary key (username)
);

DROP TABLE IF EXISTS high_score CASCADE;
CREATE TABLE high_score (
  high_score      int(8) not null,
  username      varchar(20) not null,
  datetime      datetime, 
  foreign key (username) references account(username)
);

SET FOREIGN_KEY_CHECKS = 1;

