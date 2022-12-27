import express from 'express';
import { mapaRecetas } from 'recetasService.js'; // formerly ../public/recetasService
import { mapaIngredientes, objIngrediente } from 'ingredientesService.js';

export const router = express.Router();

router.get('/recetas', (req, res) => {
    res.render('recetas');
});

router.get('/ingredientes', (req, res) => {
    res.render('ingredientes');
});

//hay que revisar esto, la lista de ingredientes principalmente
router.get('/crearReceta', (req, res) => {
    let ingredientList = Array.from(mapaIngredientes.values())
    
    res.render('crearReceta', {titulo: "Crea una nueva receta!", ingredientes:ingredientList})
});

router.get('/modificarReceta/:id', (req, res) => {
    let ingredientList = Array.from(mapaIngredientes.values())
    let recetaModificar = mapaRecetas.get(req.params.id)

    res.render('crearReceta', {titulo: "Actualiza tu maravillosa receta!", ingredientes:ingredientList, receta:recetaModificar})
});

router.get('/crearIngrediente', (req, res) =>{ 
    res.render('crearIngrediente', {titulo: "Crea un nuevo Ingrediente!", ingrediente:ingredientePlaceHolder})
});

router.get('/modificarIngrediente/:id', (req, res) => {
    res.render('crearIngrediente', {titulo: "Actualiza tu maravilloso ingrediente!", ingrediente:mapaIngredientes.get(req.params.id)})
});

router.get('/buscar', (req, res) => {
    res.render('buscar');
});

router.get('/recetas/:id', (req, res) => {
    let receta = mapaRecetas.get(req.params.id)
    res.render('recetaDetailed', {
        nombre: `${receta.nombre}`,
        descripcion:`${receta.descripcion}`,
        foto:`${receta.foto}`,
        ingredientes:`${receta.ingredientes}`,
        pasos:`${receta.pasos}`
    });
});

//le hay que poner los router.post de crear y actualizar receta e ingrediente

export default router;