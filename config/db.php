<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 */
return [
    'driver' 		=> 'mysql',
    'server' 		=> getenv('MYSQL_HOST') ?: getenv('DATA_DB_HOST', true),
    'user' 			=> getenv('MYSQL_USER') ?: getenv('DATA_DB_USER', true),
    'password' 		=> getenv('MYSQL_PASSWORD') ?: getenv('DATA_DB_PASS', true),
    'database' 		=> getenv('MYSQL_DATABASE') ?: getenv('DATA_DB_NAME', true) ?:  'gonano',
    'schema'      	=> 'public',
    'tablePrefix' 	=> '',
];
