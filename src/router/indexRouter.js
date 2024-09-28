const express = require('express');

const {getProduct,postProduct,putProduct,delProduct} =require('../models/product/productapi')

const {getPurchase,postPurchase,putPurchase,delPurchase} = require('../models/bills/purchaseapi')

const {getSales,postSales,putSales,delSales} = require('../models/bills/salesapi')

const {getStock} = require('../models/stock/stockApi')

const route = express.Router();


route.get('/product',async(req,res)=>{
    const result = await getProduct()
    res.json(result)
})

route.post('/product', async(req,res)=>{
    console.log(req.body);
    const result= await postProduct(req.body)
    res.json(result)

})

route.put('/product', async(req,res)=>{
    console.log(req.body);
    const result = await putProduct(req.body)
    res.json(result)
})

route.delete('/product/:id', async(req,res)=>{
    console.log(req.params);
    const result = await delProduct(req.params)
    res.json(result)
})


route.get('/purchase',async(req,res)=>{
    const result = await getPurchase()
    res.json(result)
})

route.post('/purchase', async(req,res)=>{
    console.log(req.body);
    const result= await postPurchase(req.body)
    res.json(result)

})

route.put('/purchase', async(req,res)=>{
    console.log(req.body);
    const result = await putPurchase(req.body)
    res.json(result)
})

route.delete('/purchase/:id', async(req,res)=>{
    console.log(req.params);
    const result = await delPurchase(req.params)
    res.json(result)
})

route.get('/sales',async(req,res)=>{
    const result = await getSales()
    res.json(result)
})

route.post('/sales', async(req,res)=>{
    console.log(req.body);
    const result= await postSales(req.body)
    res.json(result)

})

route.put('/sales', async(req,res)=>{
    console.log(req.body);
    const result = await putSales(req.body)
    res.json(result)
})

route.delete('/sales/:id', async(req,res)=>{
    console.log(req.params);
    const result = await delSales(req.params)
    res.json(result)
})

route.get('/stock',async(req,res)=>{
    const result = await getStock()
    res.json(result)
})

route.use((req,res)=>{
    console.log("404")
    res.send('404 not found')
})



module.exports={
    apiRoute:route
}

