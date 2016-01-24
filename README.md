
# Search Gene Data

Searches gene data for matches on

### How to use


### Deployment instructions
sudo easy_install pip
sudo pip install Django mysqlclient

### To dos
1.


grant all privileges on *.* to 'admin'@'localhost';
grant select on *.* to 'web'@'localhost';

CREATE TABLE `ref_gene_data` (
  `name` varchar(16) NOT NULL,
  `chrom` varchar(32) NOT NULL,
  `tx_end` bigint(20) unsigned NOT NULL,
  `tx_start` bigint(20) unsigned NOT NULL,
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `index_name` (`name`),
  KEY `index_chrom` (`chrom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
