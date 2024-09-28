const mysql= require('mysql2/promise')

const sql = {
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'MINgi23@',
    database : 'techveel'
}


const getSales = async ()=>{
    try{
        const connection = await mysql.createConnection(sql) 
        const [result,additonaldata] = await connection.execute('select * from sales')
        return result
    }catch(err){
        console.log(err.message)
    }
}

const postSales = async (data) =>{
    try{
        const connection = await mysql.createConnection(sql) 
        const{product,quantity,amount}=data
        const [result,additonaldata]  = await connection.execute('INSERT INTO sales (product, quantity, amount) VALUES (?, ?, ?)',
        [product, quantity, amount])
        return result
    }catch(err){
        console.log(err.message)
    }
}
const putSales = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const{id,product,quantity,amount}=data
        const [result,additonaldata]  = await connection.execute('update sales set product= ? , quantity = ?, amount = ?  WHERE id  = ?',
        [product, quantity, amount,id])
        return result
    } catch (err) {
        console.log(err.message);
    }
}

const delSales = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const {id} = data
        const [result,additonaldata] = await connection.execute('delete from sales where id = ?',[id])
        return result
    } catch (err) {
        console.log(err.message);
    }
}

module.exports={
    getSales:getSales,
    postSales:postSales,
    putSales:putSales,
    delSales:delSales
}