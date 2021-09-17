const express = require ('express');
const contenedor = require ('./manejo-archivos')

const newContainer = new contenedor.Contenedor

const app = express();

const productos = newContainer.getAll()

app.get('/productos',(req,res)=>{

    productos.then((items)=>{
        let htmlText = ['<h1>Listado de productos</h1>'];

        items.map(element => {
            htmlText = [...htmlText,`<h2>${element.title}</h2>
            <p>Tiene un costo de ${element.price} $</p>
            <img src=${element.thumbnail} />
            <p>El Id de tu producto es ${element.id}</p>
            `]
        })

        res.send(`${htmlText.join('')}`);
    })
})
const producto = newContainer.getById(parseInt(Math.random() * (3 - 1) + 1))

app.get('/productosRandom',(req,res)=>{
    
    producto.then((item)=>{
        res.send(`
        <h1> Este es el producto random </h1>

        <h2>${item.title}</h2>
        <p>Tiene un costo de ${item.price} $</p>
        <img src=${item.thumbnail} />
        <p>El Id de tu producto es ${item.id}</p>
        
        `)
    }).catch((err)=>err)

})

app.listen(8080,()=>{
    console.log("server is running on port 8080")
});