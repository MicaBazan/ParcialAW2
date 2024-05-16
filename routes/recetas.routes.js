import { Router } from "express";
import { readFile, writeFile } from 'fs/promises'

const fileRecetas = await readFile('./data/recetas.json', 'utf-8')
const recetasData = JSON.parse(fileRecetas)

const fileIngredientes = await readFile('./data/ingredientes.json', 'utf-8')
const ingredientesData = JSON.parse(fileIngredientes)

const router = Router()

router.post('/agregarRecetas', (req,res)=>{

    /*
        {
            "nombre": "Nueva Receta",
            "descripcion": "Descripción de la nueva receta",
            "ingredientes": [
                    { "nombre": "Harina", "cant": "200gr" },
                    { "nombre": "Azúcar", "cant": "50gr" }
            ]
        }

    */

    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const ingredientes = req.body.ingredientes

    const id = recetasData[recetasData.length -1].id + 1

    const ingredientesIDs = ingredientes.map(ingredienteObj => {
        const ingredienteData = ingredientesData.find(e => e.nombre === ingredienteObj.nombre);
        return ingredienteData ? { id: ingredienteData.id, cant: ingredienteObj.cant } : null;
    }).filter(Boolean);


    const agregarReceta = {
        id,
        nombre,
        descripcion,
        ingredientes: ingredientesIDs
    }


    recetasData.push(agregarReceta)

    try{
        writeFile('./data/recetas.json', JSON.stringify(recetasData,null,2))
        res.status(200).json(agregarReceta)
    }
    catch(error){
        res.sendStatus(400)
    }
})


router.get('/infoRecetas', (req,res)=>{

    if (recetasData.length === 0) {
        return res.status(200).json([]);
    }

    const recetasIngredientes = recetasData.map(receta => {
        const ingredientesNombre = receta.ingredientes.map(ingrediente => {
            const ingredienteData = ingredientesData.find(e => e.id === ingrediente.id);
            return {
                id: ingrediente.id,
                nombre: ingredienteData ? ingredienteData.nombre : 'Ingrediente desconocido',
                cant: ingrediente.cant
            };
        });

        return {
            id: receta.id,
            nombre: receta.nombre,
            descripcion: receta.descripcion,
            ingredientes: ingredientesNombre
        };
    });

    res.status(200).json(recetasIngredientes);
})


router.put('/actualizarRecetas', (req,res)=>{

})

export default router