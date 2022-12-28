import express from 'express';
import { mapaRecetas } from '../public/recetasService.js'; // formerly ../public/recetasService
import { mapaIngredientes, objIngrediente } from '../public/ingredientesService.js';

export const router = express.Router();

router.get('/', (req, res) => {
    res.render('bienvenida');
});

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

    let pasos = mapaRecetas.get(req.params.id).pasos
    let listaP = []
    for (let c=0;c<pasos.length;c++){
        listaP[c] = {indice:c,valor:pasos[c]}}
    
    let listaPasos = {length:pasos.length, lista:listaP}

    let listaIngredientes = []
    let c=0
    for ([key,value] of mapaRecetas){
        listaIngredientes[c] = {indiceOG:key,indiceActual:c,nombre:value}
        c++
    }
    

    res.render('crearReceta', {titulo: "Actualiza tu maravillosa receta!", ingredientes:ingredientList, receta:recetaModificar,objPasos:listaPasos,objListaIngrediente:listaIngredientes})
});

//objPasos = {length:n, lista:[{indice:0,valor:"Hello"}, {1:"World"}]}
//objListaIngrediente = [{indiceOG:3,indiceActual:0,nombre:"juan"},{indiceOG:4,indiceActual:1,nombre:"a"}]


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
        ingredientes:`${receta.ingredientes}`, //igual se habría que mirar esto, confirmar que sea un array de la forma [{nombre:"asd"},{nombre:"asd"}]
        pasos:`${receta.pasos}`
    });
});






//le hay que poner los router.post de crear y actualizar receta e ingrediente

export default router;