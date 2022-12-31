import express from 'express';
import * as rec from './recetasService.js'; // formerly ../public/recetasService  { rec.mapaRecetas, rec.objReceta, rec.devolverRecetas }
import * as ing from './ingredientesService.js'; //{ ing.mapaIngredientes, ing.objIngrediente, ing.borrarIngrediente }


export const router = express.Router();

router.get('/buscar', (req, res) => {
    res.render('buscar')
});
///////////////////////////////////////////////////RECETAS RECETAS RECETAS///////////////////////////////////////////////////
///////////////////////////////////////////////////RECETAS RECETAS RECETAS///////////////////////////////////////////////////
///////////////////////////////////////////////////RECETAS RECETAS RECETAS///////////////////////////////////////////////////
///////////////////////////////////////////////////RECETAS RECETAS RECETAS///////////////////////////////////////////////////
///////////////////////////////////////////////////RECETAS RECETAS RECETAS///////////////////////////////////////////////////


//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
router.get('/recetas', (req, res) => {
    let recetas = rec.devolverRecetas(0,4);

    if (recetas.length === 0){
        res.render('noRecipes')
    } else{
        res.render('recetas',{
            recetas: recetas
        });
    }
});

//Usa AJAX; no renderiza ninguna view
//obtiene algunas recetas de la BD y las envía
router.get('/receta/mostrarMas', (req, res) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const recetas = rec.devolverRecetas(from,to);

    res.send(JSON.stringify(recetas));
});

router.get('/borrarTodasLasRecetas', (req, res) => {
    rec.mapaRecetas.clear()
    res.redirect('/recetas')
});
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////




//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////
//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////
router.get('/recetas/:id', (req, res) => {
    
    let receta = rec.mapaRecetas.get(req.params.id)
    let listaIng = []
    for (let key of receta.ingredientes){
        listaIng.push({valor:ing.mapaIngredientes.get(key.toString()).getName()})
    }

    res.render('recetaDetailed', {
        nombre: receta.nombre,
        descripcion:receta.descripcion,
        foto:receta.foto,
        ingredientes:listaIng, //igual se habría que mirar esto, confirmar que sea un array de la forma [{nombre:"asd"},{nombre:"asd"}]
        pasos:receta.pasos,
        desplazamiento:'../',
        indice:req.params.id
    
    });
});

router.get('/recetas/borrar/:id', (req, res) => {
    rec.borrarReceta(req.params.id)
    res.redirect('/recetas')
});

router.get('/recetas/modificar/:id', (req, res) => {
    let recetaModificar = rec.mapaRecetas.get(req.params.id)

    let pasos = recetaModificar.pasos
    let listaP = []
    for (let c=0;c<pasos.length;c++){
        listaP[c] = {indice:c+1, indiceMenosUno:c, valor:pasos[c]}}
    
    let listaPasos = {length:pasos.length, lengthPlusOne:pasos.length+1 ,lista:listaP}

    let listaIngredientes = []
    let c=0
    for (let [key,value] of ing.mapaIngredientes){
        listaIngredientes[c] = {indiceOG:key,indiceActual:c,nombre:value.getName()}
        c++
    }
    

    res.render('crearReceta', {
        titulo: "Actualiza tu maravillosa receta!", 
        receta:recetaModificar,
        objPasos:listaPasos,
        objListaIngrediente:listaIngredientes,
        desplazamiento:'../../',
        modificar:"True",
        indiceReceta:'/'+req.params.id,
        ingredientSize:ing.mapaIngredientes.size
    })
});
//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////
//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////




//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////
router.get('/crearReceta', (req, res) => {
    //let ingredientList = Array.from(ing.mapaIngredientes.values())
    
    let objPasosVacio = {length:0, lengthPlusOne:1, lista:[]}

    let recetaVacia = ""
    let listaIngredientes = []
    let c=0
    for (let [key,value] of ing.mapaIngredientes){
        listaIngredientes[c] = {indiceOG:key,indiceActual:c,nombre:value.getName()}
        c++
    }

    res.render('crearReceta', {titulo: "Crea una nueva receta!", 
    receta:recetaVacia,
    objPasos:objPasosVacio,
    objListaIngrediente:listaIngredientes, 
    check:"cheked",
    ingredientSize:ing.mapaIngredientes.size})
});

router.get('/receta/guardar', (req, res) => {

    rec.nuevaReceta(JSON.parse(req.query.receta))

    res.redirect('/recetas')
})

router.get('/receta/guardar/:id', (req, res) => {
    rec.modificarReceta(req.params.id, JSON.parse(req.query.receta))

    res.redirect(`/recetas/${req.params.id}`)
});
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////




//////////////////////// FUNCIONES TIPO FETCH /////////////////////////
//////////////////////// FUNCIONES TIPO FETCH  //////////////////////// 
/////////(obtienen datos sobre recetas/ingredientes para main)/////////
router.get('/getIngredientesUsadosEnRecetas', (req, res) => {
    let listaIngredientesUsados = []
    for (let receta of rec.mapaRecetas){
        for (let ingrediente of receta[1].ingredientes){
            listaIngredientesUsados.push(ingrediente)
        }
    }
    listaIngredientesUsados = [... new Set(listaIngredientesUsados)]
    let resultToSend = JSON.stringify({lista:listaIngredientesUsados})
    
    res.send(resultToSend)
})

router.get('/getIngredients/:id', (req, res) => {
    let listaIngredientes = rec.mapaRecetas.get(req.params.id).ingredientes
        
    let resultToSend = JSON.stringify({lista:listaIngredientes})
    
    res.send(resultToSend)
})

router.get('/getIngredients', (req, res) => {
    let listaIngredientes = [... ing.mapaIngredientes.values()]
        
    let resultToSend = JSON.stringify({lista:listaIngredientes})
    
    res.send(resultToSend)
})

router.get('/getRecetas', (req, res) => {
    let listaRecetas = []
    for (let pair of rec.mapaRecetas){
        listaRecetas.push({indice:pair[0],nombre:pair[1].nombre})
    }
        
    let resultToSend = JSON.stringify({lista:listaRecetas})
    
    res.send(resultToSend)
})
//////////////////////// FUNCIONES TIPO FETCH ////////////////////////
//////////////////////// FUNCIONES TIPO FETCH ////////////////////////


//objPasos = {length:n, lista:[{indice:0,valor:"Hello"}, {1:"World"}]}
//objListaIngrediente = [{indiceOG:3,indiceActual:0,nombre:"juan"},{indiceOG:4,indiceActual:1,nombre:"a"}]

//////////////////////////////////^^^^^^^^^RECETAS RECETAS RECETAS^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^RECETAS RECETAS RECETAS^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^RECETAS RECETAS RECETAS^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^RECETAS RECETAS RECETAS^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^RECETAS RECETAS RECETAS^^^^^^^^^//////////////////////////////////


/////////////////////////////////////////////////INGREDIENTES INGREDIENTES/////////////////////////////////////////////////
/////////////////////////////////////////////////INGREDIENTES INGREDIENTES/////////////////////////////////////////////////
/////////////////////////////////////////////////INGREDIENTES INGREDIENTES/////////////////////////////////////////////////
/////////////////////////////////////////////////INGREDIENTES INGREDIENTES/////////////////////////////////////////////////
/////////////////////////////////////////////////INGREDIENTES INGREDIENTES/////////////////////////////////////////////////

//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
router.get('/ingredientes', (req, res) => {
    let lista = []
    let c = 0
    for (let pair of ing.mapaIngredientes){
        lista[c]= {indice:pair[0],nombre:pair[1].getName(),descripcion:pair[1].getDescripcion()}
        c++
    }
    res.render('ingredientes', {listaIngredientes:lista});
});

router.get('/ingredientes/borrar/:id', (req, res) => {
    ing.borrarIngrediente(req.params.id)
    res.redirect('/ingredientes')
    
})

router.get('/ingredientes/modificar/:id', (req, res) => {
    res.render('crearIngrediente', {indice:'/'+req.params.id,modificar:"True", desplazamiento:"../../", titulo: "Actualiza tu maravilloso ingrediente!", ingrediente:ing.mapaIngredientes.get(req.params.id)})
})
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////



//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR INGREDIENTES ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR INGREDIENTES ////////////////////////
router.get('/crearIngrediente', (req, res) =>{ 
    res.render('crearIngrediente', {titulo: "Crea un nuevo Ingrediente!"})
});

router.get('/ingredientes/guardar', (req, res) => {
    
    let ingToSave = new ing.objIngrediente(req.query.iName,req.query.iDesc)
    ing.nuevoIngrediente(ingToSave)
    res.redirect('/ingredientes')
    
})

router.get('/ingredientes/guardar/:id', (req, res) => {

    let ingToSave = new ing.objIngrediente(req.query.iName,req.query.iDesc)
    ing.modificarIngrediente(req.params.id, ingToSave)
    res.redirect('/ingredientes')
    
})
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR INGREDIENTES ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR INGREDIENTES ////////////////////////

//////////////////////////////////^^^^^^^^^INGREDIENTES  INGREDIENTES^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^INGREDIENTES  INGREDIENTES^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^INGREDIENTES  INGREDIENTES^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^INGREDIENTES  INGREDIENTES^^^^^^^^^//////////////////////////////////
//////////////////////////////////^^^^^^^^^INGREDIENTES  INGREDIENTES^^^^^^^^^//////////////////////////////////


export default router;