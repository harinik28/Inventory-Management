const mysql= require('mysql2/promise')

const sql = {
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'MINgi23@',
    database : 'techveel'
}


const getStock = async ()=>{
    try{
        const connection = await mysql.createConnection(sql) 
        const [result,additonaldata] = await connection.execute('select * from stock')
        return result; 
    }catch(err){
        console.log(err.message)
    }
}


module.exports={
    getStock:getStock,
}