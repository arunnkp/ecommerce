import mysql from 'mysql'

let dbconfig = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ecom'
  });

  dbconfig.connect((err) => {
  if (err) return console.error(err.message);

  console.log('Connected to the MySQL server.');
});

module.exports=dbconfig