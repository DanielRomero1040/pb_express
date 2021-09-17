const express = require ('express');
const contenedor = require ('./manejo-archivos')

const newContainer = new contenedor.Contenedor

const app = express();

const productos = newContainer.getAll()

app.get('/productos',(req,res)=>{

    productos.then((items)=>{
        res.send(`
        <h1> lista de productos </h1>

        ${items.map(element => (
            element.title
        ))}
        
        `);
    })
})
const producto = newContainer.getById(parseInt(Math.random() * (3 - 1) + 1))

app.get('/productosRandom',(req,res)=>{
    
    producto.then((item)=>{
        res.send(`
        <h1> Este es el producto random </h1>

        ${JSON.stringify(item, null, 2)}
        
        `)
    }).catch((err)=>err)

})

app.listen(8080,()=>{
    console.log("server is running on port 8080")
});