import { Router } from "express";
import { readFile, writeFile } from 'fs/promises'

const fileIngredientes = await readFile('./data/ingredientes.json', 'utf-8')
const ingredientesData = JSON.parse(fileIngredientes)

const router = Router()


router.post('/agregarIngredientes', (req, res)=>{

    /* body
        {
            "nombre": "nombreIngrediente"
        }
    */
    const nombre = req.body.nombre

    const id = ingredientesData[ingredientesData.length -1].id + 1

    const agregarIngredientes = {
        id,
        nombre
    }

    ingredientesData.push(agregarIngredientes)

    try{
        writeFile('./data/ingredientes.json', JSON.stringify(ingredientesData,null,2))
        res.status(200).json(agregarIngredientes)
    }catch(error){
        res.sendStatus(400)
    }
})


router.get('/infoIngrediente', (req,res)=>{

    if(ingredientesData.length){
        res.status(200).json(ingredientesData)
    }else{
        res.status(400).json(`No hay ingredientes guardados`)
    }
})


export default router