const sql=require('mysql2')



//mySQL connection string for the database
const pool=sql.createPool({
    host:'localhost',
    user:'KD1-Yashraj-86633',
    password:'yashraj123',
    port:3306,
    database:'airbnb_db',
    connectionLimit: 20
})

module.exports={
    pool
}

