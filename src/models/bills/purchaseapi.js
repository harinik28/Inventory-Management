const mysql= require('mysql2/promise')

const sql = {
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'MINgi23@',
    database : 'techveel'
}


const getPurchase = async ()=>{
    try{
        const connection = await mysql.createConnection(sql) 
    const [result,additonaldata] = await connection.execute('select * from purchase')
    return result
    }catch(err){
        console.log(err.message)
    }
}

const postPurchase = async (data) =>{
    try{
        const connection = await mysql.createConnection(sql) 
        const{product,quantity,amount}= data
        const [result,additonaldata]  = await connection.execute("INSERT INTO purchase (product, quantity, amount) VALUES (?, ?, ?)",
        [product, quantity, amount])
        return result
    }catch(err){
        console.log(err.message)
    }
}
const putPurchase = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const{id,product,quantity,amount}= data
        const [result,additonaldata]  = await connection.execute('update purchase set product= ? , quantity = ?, amount = ?  WHERE id  = ?',
        [product, quantity, amount,id])
        return result
    } catch (err) {
        console.log(err.message);
    }
}

const delPurchase = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const {id} = data
        const [result,additonaldata] = await connection.execute('delete from purchase where id = ?',[id])
        return result
    } catch (err) {
        console.log(err.message);
    }
}

module.exports={
    getPurchase:getPurchase,
    postPurchase:postPurchase,
    putPurchase:putPurchase,
    delPurchase:delPurchase
}