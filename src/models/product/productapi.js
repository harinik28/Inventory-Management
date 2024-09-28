const mysql= require('mysql2/promise')

const sql = {
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'MINgi23@',
    database : 'techveel'
}

const getProduct = async () => {
    try {
        const connection = await mysql.createConnection(sql) 
        const [result, additonaldata] = await connection.execute('SELECT * FROM products')
       return result; 
    } catch (err) {
        console.log(err.message)
    }
}

const postProduct = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const {name, category, brand} = data
        const [result, additonaldata] = await connection.execute(
            'INSERT INTO products (name, category, brand) VALUES (?, ?, ?)',
            [name, category, brand]
        )
       return result; 
    } catch (err) {
        console.log(err.message)
    }
}

const putProduct = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const {id, name, category, brand} = data
        const [result, additonaldata] = await connection.execute(
            'UPDATE products SET name = ?, category = ?, brand = ? WHERE id = ?',
            [name, category, brand, id]
        )
       return result; 
    } catch (err) {
        console.log(err.message);
    }
}

const delProduct = async (data) => {
    try {
        const connection = await mysql.createConnection(sql) 
        const {id} = data
        const [result, additonaldata] = await connection.execute(
            'DELETE FROM products WHERE id = ?', [id]
        )
       return result; 
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getProduct: getProduct,
    postProduct: postProduct,
    putProduct: putProduct,
    delProduct: delProduct
}
