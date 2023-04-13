import ProductManager from "./productManager.js";
import express from 'express';


const pm = new ProductManager();
const app = express();
const PORT = 8080

app.use(express.json());

app.get("/",(req, res)=>{
    res.send("Hola estoy en Backend con Express")
})

app.get("/papa",(req, res)=>{
res.send('<h1 style = "color: red">Bienvenido</h1>')
})

app.get("/products", async (req, res)=>{
    
    try {
         const products = new ProductManager()
       if(!req.query.limit){
       res.send(await products.getProducts())
    }

    if(req.query.limit){
       const usersLimit = await products.getProducts();
    for(let i = 0; usersLimit.length; i++){
        if(usersLimit.indexOf(usersLimit[i])< req.query.limit){
            const selection = usersLimit.slice(0,req.query.limit)          
            res.send(selection)
        }
    }}
    } catch (error) {
        console.log(error);
    }
            
}
)


app.get("/products/:id", async (req, res)=>{
    // console.log(req.params.id);
    const users = new ProductManager()
    res.send(await users.getProductById(parseInt(req.params.id)))

})

app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});

