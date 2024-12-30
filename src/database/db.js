const sql = require('mssql')

// Config DB SQL SERVER 2012 LOCAL - Configuracion con SQL SERVER 2012 LOCAL
/*
const config = {
    database: 'NodeJsDemo',
    authentication: { type: 'default', options: { userName: 'sa', password: 'sa' } },
   // authentication: { type: 'default', options: { userName: 'sa', password: 'sql@sqc2' } },
   // authentication: { type: 'default', options: { userName: 'sa', password: 'Admin@1234' } },
    //server: '10.12.13.163',
    
   // server: '10.12.13.164',

    //server: 'SQC-348\\SQLEXPRESS',
     //server: 'LAPTOP-M5G74FOS',
     server: 'LAPTOP-M5G74FOS',
    options: {
      // trustServerCertificate: true,
      // useColumnNames: true,        
      // rowCollectionOnDone: true,
      // trustedconnection: true,
      // enableArithAbort: false,
       // instanceName: 'SQLEXPRESS',
       // instanceName: 'MSSQLSERVER',
        encrypt: false
    }//,
    //port: 1433
}
*/


const config = {
  user: 'sa',
  password: 'sa',
  database: 'NodeJsDemo',
  //server: 'LAPTOP-M5G74FOS', // Connect to the host's SQL Server
  server: 'host.docker.internal', //when uning DOCKER Connect to the host's SQL Server
  options: {
      encrypt: false, // Use encryption if required
      trustServerCertificate: true // Necessary for local SQL Server instances
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Successfully Connected to a SQL SERVER')
    return pool
  })
  .catch(err => console.log('Database error, mal Config: ', err))

module.exports = {
  sql, poolPromise
}

