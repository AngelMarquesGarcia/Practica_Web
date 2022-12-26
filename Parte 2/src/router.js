import express from 'express';
import { mapaRecetas } from 'recetasService.js'; // formerly ../public/recetasService

export const router = express.Router();

router.get('/recetas', (req, res) => {
    res.render('recetas');
});

router.get('/ingredientes', (req, res) => {
    res.render('ingredientes');
});

router.get('/crearReceta', (req, res) => {
    if (req.query.actualizar){
        res.render('crearReceta', {titulo: "Actualiza tu maravillosa receta!"})}
    else {
        res.render('crearReceta', {titulo: "Crea una nueva receta!"})}
});

router.get('/crearIngrediente', (req, res) => {
    if (req.query.actualizar){
        res.render('crearIngrediente', {titulo: "Actualiza tu maravilloso ingrediente!"})}
    else {
        res.render('crearIngrediente', {titulo: "Crea un nuevo Ingrediente!"})}
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