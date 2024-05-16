import express from 'express'
import recetasRouter from './routes/recetas.routes.js'
import ingredientesRouter from './routes/ingredientes.routes.js'

const app = express()

app.use(express.json())

const port = 3000

app.listen(port,()=>{
    console.log(`servidor levantado en el puerto ${port}`)
})


app.use('/recetas',recetasRouter)
app.use('/ingredientes',ingredientesRouter)