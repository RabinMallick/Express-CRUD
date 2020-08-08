const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

// const excecute = (sql, param, callback) =>{
//     if(param == null){
//         connection.query(sql, (err, result) => {
//             if(err)
//                 console.log(err)
//             else   
//                 callback(result);
//         });
//     }
//     else{
//         connection.query(sql,param, (err, result) => {
//             if(err)
//                 console.log(err)
//             else   
//                 callback(result);
//         });
//     }
// }

module.exports = mysqlConnection;