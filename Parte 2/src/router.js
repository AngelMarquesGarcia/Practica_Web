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
    //Obtiene las 4 primeras recetas del array, y las muestra.
    //Si no hubiera recetas, muestra otra página distinta que avisa de esto
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
router.get('/receta/mostrarMas', (req, res) => {
    //obtiene algunas recetas de la BD y las envía

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const recetas = rec.devolverRecetas(from,to);

    res.send(JSON.stringify(recetas));
});

//Función intermedia, no renderiza, hace redirect
router.get('/borrarTodasLasRecetas', (req, res) => {
    rec.mapaRecetas.clear()
    res.redirect('/recetas')
});
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////




//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////
//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////
router.get('/recetas/:id', (req, res) => {
    //Envía a la vista 'recetaDetailed' la receta y sus campos. 
    //Como los ingredientes están guardados por su clave, crea y envía una lista nueva que contenga sus nombres.
    //Para cada clave de ingrediente de la receta, obtiene el nombre del ingrediente que tenga esa clave, y lo mete en esta lista.
    let receta = rec.mapaRecetas.get(req.params.id)
    let listaIng = []
    for (let key of receta.ingredientes){
        listaIng.push({valor:ing.mapaIngredientes.get(key.toString()).getName()})
    }

    res.render('recetaDetailed', {
        receta: receta,                                        
        ingredientes:listaIng,                                                   
        desplazamiento:'../',                           
        indice:req.params.id
    });
});

//Función intermedia, no renderiza, hace redirect
router.get('/recetas/borrar/:id', (req, res) => {
    //borra la receta especificada y carga la página principal
    rec.borrarReceta(req.params.id)
    res.redirect('/recetas')
});

router.get('/recetas/modificar/:id', (req, res) => {
    //Carga la vista de crearReceta pasándole los datos de la receta a modificar.

    let recetaModificar = rec.mapaRecetas.get(req.params.id)

    //guardamos en listaP cada paso con su indice, y el indice menos uno
    let pasos = recetaModificar.pasos
    let listaP = []
    for (let c=0;c<pasos.length;c++){
        listaP[c] = {indice:c+1, indiceMenosUno:c, valor:pasos[c]}}
    
    let listaPasos = {length:pasos.length, lengthPlusOne:pasos.length+1 ,lista:listaP}

    //guardamos en listaIngredientes el nombre de cada ingrediente con su clave y su posicion en la lista
    let listaIngredientes = []
    let c=0
    for (let [key,value] of ing.mapaIngredientes){
        listaIngredientes[c] = {clave:key,indiceActual:c,nombre:value.getName()}
        c++
    }
    

    res.render('crearReceta', {
        titulo: "Actualiza tu maravillosa receta!",             //El título de la página
        receta:recetaModificar,                                 //Es la receta con la clave dada. Sin modificaciones
        objPasos:listaPasos,                                    //Objeto que guarda una lista, y su longitud, y longitud+1. 
                                                                //La lista consta de una serie de objetos que guardan: un valor (string, el paso como tal), su índice, y su índice menos uno
        objListaIngrediente:listaIngredientes,                  //Una lista que contiene los nombres de todos los ingredientes, junto con su íncide en la lista, y su clave en el mapa
        desplazamiento:'../../',                                //Irá en el <head> en al cargar el css y js. Retrocede hasta root, donde se encuentran estos archivos
        modificar:"True",                                       //Una string no vacía, para que se muestre el botón de cancelar
        indiceReceta:'/'+req.params.id,                         //La clave de la receta precedida de una barra "/"
        ingredientSize:ing.mapaIngredientes.size                //El tamaño del mapa de ingredientes. Es necesario para poder iterar por todos los ingredientes al guardar.
    })
});
//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////
//////////////////////// FUNCIONES PARA LA VISTA DETALLADA DE UNA RECETA ////////////////////////




//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////
router.get('/crearReceta', (req, res) => {
    //Carga la vista 'crearReceta' pasándole objetos "vacíos", menos en la lista de ingredientes, 
    //que rellena con objetos que contienen el nombre del ingrediente, su índice en la lista, y su clave en el mapa

    let objPasosVacio = {length:0, lengthPlusOne:1, lista:[]}

    let recetaVacia = ""
    let listaIngredientes = []
    let c=0
    for (let [key,value] of ing.mapaIngredientes){
        listaIngredientes[c] = {clave:key,indiceActual:c,nombre:value.getName()}
        c++
    }

    res.render('crearReceta', {
        titulo: "Crea una nueva receta!",                   //El título de la página
        receta:recetaVacia,                                 //Como no queremos darle valor a los input, pasamos una receta vacía
        objPasos:objPasosVacio,                             //Como no hay pasos que mostrar, pasamos un objeto vacío
        objListaIngrediente:listaIngredientes,              //Igual que en '/recetas/modificar/:id' //Una lista que contiene los nombres de todos los ingredientes, junto con su íncide en la lista, y su clave en el mapa
        ingredientSize:ing.mapaIngredientes.size            //El tamaño del mapa de ingredientes. Es necesario para poder iterar por todos los ingredientes al guardar.
    })
});

//Función intermedia, no renderiza, hace redirect
router.get('/receta/guardar', (req, res) => {
    //recibe en la URL una string JSON que corresponde a una receta, y llama a la funcion nuevaReceta con ese JSON interpretado como objeto.
    //Luego carga la view recetas

    rec.nuevaReceta(JSON.parse(req.query.receta))

    res.redirect('/recetas')
})

//Función intermedia, no renderiza, hace redirect
router.get('/receta/guardar/:id', (req, res) => {
    //recibe en la URL una string JSON que corresponde a una receta, 
    //y llama a la funcion modificarReceta con ese JSON interpretado como objeto y la clave del objeto al que corresponde.

    rec.modificarReceta(req.params.id, JSON.parse(req.query.receta))

    res.redirect(`/recetas/${req.params.id}`)
});
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR RECETAS ////////////////////////




//////////////////////// FUNCIONES TIPO FETCH /////////////////////////
//////////////////////// FUNCIONES TIPO FETCH  ////////////////////////
/////////(obtienen datos sobre recetas/ingredientes para main)/////////
////////////////(Usan AJAX; no renderizan ninguna view)////////////////
router.get('/getIngredientesUsadosEnRecetas', (req, res) => {
    //devuelve todos los ingredientes que se usen en al menos una receta

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
    //Enviamos los ingredientes de la receta que tenga como clave el id dado como JSON

    let listaIngredientes = rec.mapaRecetas.get(req.params.id).ingredientes
        
    let resultToSend = JSON.stringify(listaIngredientes) //{lista:listaIngredientes}
    
    res.send(resultToSend)
})

router.get('/getIngredients', (req, res) => {
    //Envia todos los ingredientes del mapaIngredientes en una lista

    let listaIngredientes = [... ing.mapaIngredientes.values()]
        
    let resultToSend = JSON.stringify({lista:listaIngredientes})
    
    res.send(resultToSend)
})

router.get('/getRecetas', (req, res) => {
    //Envía una lista con los nombres de las recetas y su clave

    let listaRecetas = []
    for (let pair of rec.mapaRecetas){
        listaRecetas.push({clave:pair[0],nombre:pair[1].nombre})
    }
        
    let resultToSend = JSON.stringify(listaRecetas)
    
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
    //crea una lista que contiene todos los ingredientes emparejados con su clave, y renderiza la vista ingredientes con esa lista

    let lista = []
    let c = 0
    for (let pair of ing.mapaIngredientes){
        lista[c]= {clave:pair[0], ingrediente:pair[1]} //nombre:pair[1].getName(), descripcion:pair[1].getDescripcion()
        c++
    }
    res.render('ingredientes', {listaIngredientes:lista});
});

//Función intermedia, no renderiza, hace redirect
router.get('/ingredientes/borrar/:id', (req, res) => {
    //borra el ingrediente seleccionado
    ing.borrarIngrediente(req.params.id)
    res.redirect('/ingredientes')
    
})

router.get('/ingredientes/modificar/:id', (req, res) => {
    //renderiza la vista de crearIngrediente pasándole los argumentos necesarios

    res.render('crearIngrediente', {
        indice:'/'+req.params.id,
        modificar:"True",                                       //Al ser una string no vacía, se mostrará el botón de cancelar
        desplazamiento:"../../", 
        titulo: "Actualiza tu maravilloso ingrediente!", 
        ingrediente:ing.mapaIngredientes.get(req.params.id)     //Corresponde al ingrediente a modificar
    })
})
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////
//////////////////////// FUNCIONES PARA LA PÁGINA PRINCIPAL ////////////////////////



//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR INGREDIENTES ////////////////////////
//////////////////////// FUNCIONES PARA CREAR/GUARDAR/MODIFICAR INGREDIENTES ////////////////////////
router.get('/crearIngrediente', (req, res) =>{ 
    res.render('crearIngrediente', {titulo: "Crea un nuevo Ingrediente!"})
});

//Función intermedia, no renderiza, hace redirect
router.get('/ingredientes/guardar', (req, res) => {
    //Crea un nuevo ingrediente con la información que reciba en el formulario, y lo guarda en el mapa de ingredientes.
    //Luego carga la página de ingredientes

    let ingToSave = new ing.objIngrediente(req.query.iName,req.query.iDesc)
    ing.nuevoIngrediente(ingToSave)
    res.redirect('/ingredientes')
    
})

//Función intermedia, no renderiza, hace redirect
router.get('/ingredientes/guardar/:id', (req, res) => {
    //Es llamada al modificar un ingrediente
    //Crea un nuevo ingrediente con la información que reciba en el formulario, y lo llama a modificarIngrediente con el ingrediente creado,
    // y la clave del ingrediente que estamos modificando

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