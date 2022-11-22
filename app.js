
// para que se vean las recetas al cargar la pagina, debemos usar el operador $, que llame a pagRecetas

class objReceta {
    constructor(n, d, i,f,p){
        this.nombre=n
        this.descripcion=d
        this.ingredientes=i
        this.foto=f
        this.pasos=p
        }

    getName(){
        return this.nombre
    }
    getDescription(){
        return this.descripcion
    }
    getIngredientes(){
        return this.ingredientes
    }
    getFoto(){
        return this.foto
    }
    getPasos(){
        return this.pasos
    }
}

class objIngrediente {

    constructor(n, d){
        this.nombre=n
        this.descripcion=d
        }
    getName(){
        return this.nombre
    }
    getDescripcion(){
        return this.descripcion
    }

}

$('Index.html').ready(function() {
    pagRecetas()
})

   

function setActiveNavTab(targetTab){ //could be done better by giving current and previous tab, so that only the previous tab is accesed and disabled
    let tabs = ['recetas', 'ingredientes', 'crearReceta', 'crearIngrediente', 'buscar']
    
    
    for (let tab of tabs) { //makes all tabs inactive || Previously (let i = 0; i < tabs.length; i++)
        let content = document.getElementById(tab) //previously tabs[i]
        content.setAttribute("class",  "inactive")
    } 
    if (targetTab==='disable'){return}else{ ////////////////////////////////////////////////////SE HAY QUE MIRAR ESTO
    let content = document.getElementById(targetTab) //makes current tab active
    content.setAttribute("class",  "active")}
}

////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
function pagRecetas() {
    let tab = document.getElementById('recetas') 
    
    if (tab.getAttribute("class") == 'inactive'){
    
    
    //making the active nav-tab show properly
    setActiveNavTab('recetas')
    //making the active nav-tab show properly

    let content = document.getElementById('content')
    
    content.innerHTML = ""
    let titulo = document.createElement("h2")
    titulo.innerText = '¡He aquí tus preciadas recetas!'
    content.appendChild(titulo)

    var elementos = document.createElement("div")
    elementos.setAttribute("class",  "wrapper")
    for (let i = 0; i < listaRecetas.length; i++){

        var elemento = document.createElement("div")
        elemento.setAttribute("class",  "receta")
        elemento.setAttribute("onclick",  "mostrarReceta("+i+")")
        let foto = document.createElement("img")
        foto.setAttribute('src',listaRecetas[i].foto)
        foto.setAttribute('class', 'img-responsive')
        elemento.appendChild(foto)
        let nombre = document.createElement("h2")                 //nombre
        nombre.innerText = listaRecetas[i].getName() 
        elemento.appendChild(nombre)
        let desc = document.createElement("p")                    //descripcion
        desc.innerText = listaRecetas[i].getDescription()

        elemento.appendChild(desc)
        elementos.appendChild(elemento)
    }

    
    
    content.appendChild(elementos)
        

}
    }


function pagIngredientes() {
    let tab = document.getElementById('ingredientes') 
    
    if (tab.getAttribute("class") == 'inactive'){


    setActiveNavTab('ingredientes')

    let content = document.getElementById('content');
    content.innerHTML = ""
    var elementos = document.createElement("div")
    elementos.setAttribute("class", "container")
    elementos.setAttribute("class", "scrollbar")
    for(let ingrediente of listaIngredientes){
        
    var elemento = document.createElement("div") //creamos el "ingrediente"
    elemento.setAttribute("class",  "ingrediente")

    let nombre = document.createElement("h3") //damos nombre al ingrediente
    nombre.innerText = ingrediente.getName()
    elemento.appendChild(nombre)

    let desc = document.createElement("p") //damos desc al ingrediente
    desc.innerText = ingrediente.getDescripcion()
    elemento.appendChild(desc)

    elementos.appendChild(elemento) //añadimos el ingrediente a la lista
    }

    content.appendChild(elementos)
}

}

function mostrarReceta(i){
    setActiveNavTab('disable')
    let content = document.getElementById('content')
    content.innerHTML = ''
    
    var elemento = document.createElement("div")
    elemento.setAttribute("class",  "receta")

    //añadir foto
    let foto = document.createElement("img")
    foto.setAttribute('src', listaRecetas[i].getFoto()) 
    elemento.appendChild(foto)

    //añadir nombre
    let nombre = document.createElement("h2")
    nombre.innerText = listaRecetas[i].getName() 
    elemento.appendChild(nombre)
    
    //añadir descripcion
    let desc = document.createElement("p")
    desc.innerText = listaRecetas[i].getDescription()
    elemento.appendChild(desc)

    //Añadir pasos
    let pasosTitulo = document.createElement("h3")
    pasosTitulo.innerText = 'Pasos:'

    let pasos = document.createElement("ol")
    for (let p of listaRecetas[i].getPasos()){
        var paso = document.createElement("li")
        paso.innerText=p
        pasos.appendChild(paso)
    }
    elemento.appendChild(pasosTitulo)
    elemento.appendChild(pasos)

    //Añadir ingredientes
    let ingTitulo = document.createElement("h3")
    ingTitulo.innerText = 'Ingredientes:'

    let ingredientes = document.createElement("ul")
    for (let ing of listaRecetas[i].getIngredientes()){
        var ingrediente = document.createElement("li")
        ingrediente.innerText=ing
        ingredientes.appendChild(ingrediente)
    }
    elemento.appendChild(ingTitulo)
    elemento.appendChild(ingredientes)


    //añadir botones

    let goBackButton = document.createElement("button")   //btn Volver
    goBackButton.setAttribute("type",  "button")          //btn Volver
    goBackButton.setAttribute("onclick",  "pagRecetas()") //btn Volver
    goBackButton.innerText = 'Volver'                     //btn Volver

    let btnModificar = document.createElement("button")   //btn Modificar                  
    btnModificar.setAttribute('onclick','modificarReceta('+i+')')   //btn Modificar          
    btnModificar.innerText = 'Modificar Receta'           //btn Modificar      
    
    let btnBorrar = document.createElement("button")      //btn Borrar           
    btnBorrar.setAttribute('onclick','borrarReceta('+i+')')      //btn Borrar   
    btnBorrar.innerText = 'Borrar Receta'                 //btn Borrar   

    content.appendChild(elemento)
    content.appendChild(goBackButton)
    content.appendChild(btnModificar)
    content.appendChild(btnBorrar)


    

}
////////////////////////////////////////////////////////////////CREAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR RECETA////////////////////////////////////////////////////////////////
function pagCrearReceta() {
    let tab = document.getElementById('crearReceta') 
    
    if (tab.getAttribute("class") == 'inactive'){
    
    
        //making the active nav-tab show properly
        setActiveNavTab('crearReceta')
        //making the active nav-tab show properly

        let content = document.getElementById('content')
        content.innerHTML = ""

        let titulo = document.createElement("h2")
        titulo.innerText = 'Crea una nueva receta!'
        content.appendChild(titulo)

        let formulario = document.createElement("form")
        formulario.setAttribute('role', 'form')

        //NOMBRE
        let nameGroup = document.createElement("div")
        nameGroup.setAttribute('class', 'form-group') 
        let nameLabel = document.createElement("label") //ETIQUETA DEL NOMBRE
        nameLabel.setAttribute('for', 'rName')  
        nameLabel.innerText = 'Nombre: '    
        let nameInput = document.createElement("input") //CAMPO DEL NOMBRE
        nameInput.setAttribute('type', 'text')          //Type
        nameInput.setAttribute('class', 'form-control') //Class
        nameInput.setAttribute('id', 'rName')            //Id
        nameInput.setAttribute('placeholder', 'Un nombre bonito') //Placeholder

        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        formulario.appendChild(nameGroup)
        //NOMBRE

        //DESCRIPCION
        let descGroup = document.createElement("div")
        descGroup.setAttribute('class', 'form-group') 
        let descLabel = document.createElement("label") //ETIQUETA DE LA DESCRIPCION
        descLabel.setAttribute('for', 'rDesc')  
        descLabel.innerText = 'Descripción: '    
        let descInput = document.createElement("input") //CAMPO DE LA DESCRIPCION
        descInput.setAttribute('type', 'text')          //Type
        descInput.setAttribute('class', 'form-control') //Class
        descInput.setAttribute('id', 'rDesc')            //Id
        descInput.setAttribute('placeholder', 'Una descripción detallada') //Placeholder

        descGroup.appendChild(descLabel)
        descGroup.appendChild(descInput)
        formulario.appendChild(descGroup)
        //DESCRIPCION

        //FOTO
        let fotoGroup = document.createElement("div")
        fotoGroup.setAttribute('class', 'form-group') 
        let fotoLabel = document.createElement("label") //ETIQUETA DE LA DESCRIPCION
        fotoLabel.setAttribute('for', 'rFoto')  
        fotoLabel.innerText = 'Introduzca la URL de una foto (opcional): '    
        let fotoInput = document.createElement("input") //CAMPO DE LA DESCRIPCION
        fotoInput.setAttribute('type', 'text')          //Type
        fotoInput.setAttribute('class', 'form-control') //Class
        fotoInput.setAttribute('id', 'rFoto')            //Id
        fotoInput.setAttribute('placeholder', 'https://imagenes.20minutos.es/uploads/imagenes/2020/06/19/rick-astley-en-su-cancion-never-gonna-give-you-up.gif') //Placeholder

        fotoGroup.appendChild(fotoLabel)
        fotoGroup.appendChild(fotoInput)
        formulario.appendChild(fotoGroup)
        //FOTO

        //PASOS
        let pasosGroup = document.createElement("div")
        pasosGroup.setAttribute('class', 'form-group') 
        let pasosLabel = document.createElement("label") //ETIQUETA DE LA DESCRIPCION
        pasosLabel.setAttribute('id', 'pasosLabel')  
        pasosLabel.setAttribute('for', 'rPasos')  
        pasosLabel.innerText = 'Introduce el paso 1 de la receta: '    
        let pasosInput = document.createElement("input")   //CAMPO DE LA DESCRIPCION
        pasosInput.setAttribute('type', 'text')            //Type
        pasosInput.setAttribute('class', 'form-control')   //Class
        pasosInput.setAttribute('id', 'rPasos')            //Id
        pasosInput.setAttribute('placeholder', 'Paso 1')   //Placeholder

        //SUBMIT PASO
        let submitPaso = document.createElement("button")
        submitPaso.setAttribute('id', 'pasosBtn')
        submitPaso.setAttribute('type', 'button')
        submitPaso.setAttribute('class', 'btn btn-default')  
        submitPaso.setAttribute('onclick', 'crearPaso(0)')  
        submitPaso.innerText = 'Enviar paso 1'
        //SUBMIT PASO

        //lista de pasos
        let pasos = document.createElement("ol")
        pasos.setAttribute('id', 'pasosList')
        //lista de pasos
    
        pasosGroup.appendChild(pasosLabel)
        pasosGroup.appendChild(pasosInput)
        pasosGroup.appendChild(submitPaso)
        pasosGroup.appendChild(pasos)
        formulario.appendChild(pasosGroup)
        //PASOS


        //INGREDIENTES
        let ingGroup = document.createElement("div")
        ingGroup.setAttribute('class', 'form-group') 

        for (let i=0;i<listaIngredientes.length;i++){
            var ingLabel = document.createElement("label")
            ingLabel.setAttribute('for', 'ing'+i)  
            ingLabel.innerText = listaIngredientes[i].getName() 
            var ingInput = document.createElement("input")      
            ingInput.setAttribute('type', 'checkbox')           //Type
            ingInput.setAttribute('id', 'ing'+i)                //Id
            ingInput.setAttribute('value', i)                   //Value

            
            ingGroup.appendChild(ingInput)
            ingGroup.appendChild(ingLabel)
            ingGroup.appendChild(document.createElement("br"))
        }
        
        formulario.appendChild(ingGroup)
        //INGREDIENTES


        //SUBMIT
        let submitButton = document.createElement("button")
        submitButton.setAttribute('type', 'reset')
        submitButton.setAttribute('class', 'btn btn-default')  
        submitButton.setAttribute('onclick', 'crearReceta()')  
        submitButton.innerText = 'Enviar'
        //SUBMIT
        formulario.appendChild(submitButton)

        content.appendChild(formulario)
        



    }
}

function incrementarPaso(i){
    let pasosActualizar = document.getElementById('pasosList').children
    let siguientePaso = pasosActualizar.length + 1
    if (siguientePaso===undefined){siguientePaso=1}
    if (i===undefined){ siguientePaso++}
    //cambiar label
    let pLabel = document.getElementById('pasosLabel')
    pLabel.innerText = 'Introduce el paso '+(siguientePaso)+' de la receta'

    //cambiar button
    let pBtn = document.getElementById('pasosBtn')
    pBtn.innerText = 'Enviar paso '+(siguientePaso)
    pBtn.setAttribute('onclick', 'crearPaso('+(siguientePaso-1)+')')

    //Modificar <input>
    let inpPasos = document.getElementById('rPasos')
    inpPasos.setAttribute('placeholder','Paso '+ (siguientePaso))

    //modificar botones de los pasos existentes si estamos eliminando
    /////////////////////////////////////////////////////////////////////////////////////DANGER
    //asdfhgsdhsfjsfdgjfsg, Si meto 6 elementos, y borro el cuarto y luego el quinto, no lo hace bien, porque al borrar el quinto borra el paso que esté en la posición 5,
    //pero como hemos borrado antes el cuarto, no debe borrar el quinto, sino el cuarto. Para que esto funcione, debemos actualizar los botones
    //para que llamen a la función con los parámetros adecuados.
    
    if (i!=undefined){
        for (let n=0;n<pasosActualizar.length;n++){  ////////////igual se puede optimizar haciendo que cambie solo los que tengan indice superior al elemento eliminado
            var li = pasosActualizar.item(n)
            li.setAttribute('id', 'idPaso'+n)
            li.firstElementChild.setAttribute('onclick','borrarPaso('+n+')')
            li.firstElementChild.innerText = 'Borar paso ' + (n+1)
        }

    }
    console.log('break')

}

function crearPaso(i){

    incrementarPaso()

    

    //Guardar el paso
    let inpPasos = document.getElementById('rPasos')
    pasosPlaceholder[i] = inpPasos.value 

    //añadir el paso i a la lista
    let listaPasos = document.getElementById('pasosList')
    let pasoI = document.createElement('li')
    pasoI.setAttribute('id','idPaso'+i)
    pasoI.innerText = inpPasos.value
    
    let btnPasoI = document.createElement('button')
    btnPasoI.setAttribute('onclick','borrarPaso('+i+')')
    btnPasoI.setAttribute('type','button')
    btnPasoI.innerText = 'Borrar paso '+ (i+1) //igual queda mejor solo 'borrar'

    pasoI.appendChild(btnPasoI)
    listaPasos.appendChild(pasoI)

    let inpToReset = document.getElementById('rPasos')
    inpToReset.value=''
}

function borrarPaso(i) {

    let parent = document.getElementById('pasosList')
    let child = document.getElementById('idPaso'+i)
    parent.removeChild(child)
    pasosPlaceholder.splice(i,1)
    incrementarPaso(i)
}

function crearReceta(){
    let nombre = document.getElementById('rName').value
    let descripcion = document.getElementById('rDesc').value
    let foto = document.getElementById('rFoto').value
    let pasos = []
    let ingredientes = []
    

    if (foto === ''){
        foto = undefinedLocation 
    }

    for (rec of listaRecetas){
        if (rec.getName()===nombre) {
            if (!confirm('Ya existe una receta con ese nombre, ¿seguro que quieres crear otra?')){
            return}
        }
    }

    let n=0
    for (let i=0;i<listaIngredientes.length;i++){
        var ingrediente = document.getElementById('ing'+i)
        if (ingrediente.checked){
            ingredientes[n] = listaIngredientes[ingrediente.value].getName()
            n++
        }
    }

    if (pasosPlaceholder.length == 0){
        alert('La receta debe tener al menos un paso')
        return
    } else { 
        for (let i=0;i<pasosPlaceholder.length;i++){
            pasos[i]=pasosPlaceholder[i]
        }
    }

    resetPasos() //Se podría poner más abajo para que solo resetee al enviar los datos, por comodidad

    if (nombre==='' || descripcion==='' ){
        alert('Ambos campos deben estar rellenos')
    } else if (ingredientes.length==0){alert('La receta debe tener al menos un ingrediente')
    } else {
        let receta = new objReceta(nombre,descripcion, ingredientes, foto, pasos)
        listaRecetas[listaRecetas.length] = receta
        
    }

}

function resetPasos(){
    pasosPlaceholder.length = 0
    let listaPasos = document.getElementById('pasosList')
    listaPasos.innerHTML = ''


    let pasosLabel = document.getElementById("pasosLabel") //ETIQUETA DE LA DESCRIPCION
    pasosLabel.innerText = 'Introduce el paso 1 de la receta: '    
    let pasosInput = document.getElementById("rPasos")   //CAMPO DE LA DESCRIPCION
    pasosInput.setAttribute('placeholder', 'Paso 1')   //Placeholder

    let submitPaso = document.getElementById("pasosBtn")
    submitPaso.setAttribute('onclick', 'crearPaso(1)')  
    submitPaso.innerText = 'Enviar paso 1'

}
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
function borrarReceta(i){
    console.log('borrar receta')
}

function modificarReceta(i){
    console.log('modificar receta')
}


////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
function pagCrearIngrediente() {
    let tab = document.getElementById('crearIngrediente') 
    
    if (tab.getAttribute("class") == 'inactive'){
    
    
        //making the active nav-tab show properly
        setActiveNavTab('crearIngrediente')
        //making the active nav-tab show properly

        let content = document.getElementById('content')
        content.innerHTML = ""
        //quitar todo el contenido anterior

        let titulo = document.createElement("h2")
        titulo.innerText = 'Crea un nuevo Ingrediente!'
        content.appendChild(titulo)
        

        //Creamos el formulario
        let formulario = document.createElement("form")
        formulario.setAttribute('role', 'form')
        
        //Creamos el campo de texto donde introducir el nombre
        let nameGroup = document.createElement("div")
        nameGroup.setAttribute('class', 'form-group') 
        let nameLabel = document.createElement("label")
        nameLabel.setAttribute('for', 'name')  
        nameLabel.innerText = 'Nombre: '    
        let nameInput = document.createElement("input")
        nameInput.setAttribute('type', 'text')  
        nameInput.setAttribute('class', 'form-control')
        nameInput.setAttribute('id', 'iName')
        nameInput.setAttribute('placeholder', 'Un nombre bonito')

        //Hacemos que el campo de nombre pertenezca a el formulario
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        formulario.appendChild(nameGroup)

        //Creamos el campo de texto donde introducir el descripción
        let descGroup = document.createElement("div")
        descGroup.setAttribute('class', 'form-group') 
        let descLabel = document.createElement("label")
        descLabel.setAttribute('for', 'desc')  
        descLabel.innerText = 'Descripción: '    
        let descInput = document.createElement("input")
        descInput.setAttribute('type', 'text')  
        descInput.setAttribute('class', 'form-control')
        descInput.setAttribute('id', 'iDesc')
        descInput.setAttribute('placeholder', 'Una descripción detallada')


        //SUBMIT
        let submitButton = document.createElement("button")
        submitButton.setAttribute('type', 'reset')  
        submitButton.setAttribute('class', 'btn btn-default')  
        submitButton.setAttribute('onclick', 'crearIngrediente()')  
        submitButton.innerText = 'Enviar'
        //SUBMIT

        //Hacemos que el campo de descripción pertenezca a el formulario
        descGroup.appendChild(descLabel)
        descGroup.appendChild(descInput)
        descGroup.appendChild(submitButton)
        formulario.appendChild(descGroup)
        
        
        //Metemos el formulario en el HTML
        content.appendChild(formulario)

    }
}

function crearIngrediente(){
    let nombre = document.getElementById('iName').value
    let descripcion = document.getElementById('iDesc').value
    for (ing of listaIngredientes){
        if (ing.getName()===nombre) {
            alert('Ya existe un ingredinete con ese nombre')
            return
        }
    }
    if (nombre==='' || descripcion===''){
        alert('Ambos campos deben estar rellenos')
    } else {
        let ingrediente = new objIngrediente(nombre,descripcion)
        listaIngredientes[listaIngredientes.length] = ingrediente
    }

}

////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////

function pagBuscar() {
    let tab = document.getElementById('buscar') 

    if (tab.getAttribute("class") == 'inactive'){
    
    
        //making the active nav-tab show properly
        setActiveNavTab('buscar')
        //making the active nav-tab show properly

        let content = document.getElementById('content')
        content.innerHTML = ""
        //quitar todo el contenido anterior

        //Creamos el formulario
        let formulario = document.createElement("form")
        formulario.setAttribute('role', 'form')
        
        let BusqGroup = document.createElement("div")
        BusqGroup.setAttribute('class', 'form-group') 
        let BusqLabel = document.createElement("label")
        BusqLabel.setAttribute('for', 'busq')  
        BusqLabel.innerText = 'Busca: '    
        let BusqInput = document.createElement("input")
        BusqInput.setAttribute('type', 'search')  
        BusqInput.setAttribute('class', 'form-control')
        BusqInput.setAttribute('id', 'busq')
        BusqInput.setAttribute('placeholder', 'Busca un ingrediente o una receta')

        //Hacemos que el campo de busqueda pertenezca a el formulario
        BusqGroup.appendChild(BusqLabel)
        BusqGroup.appendChild(BusqInput)
        formulario.appendChild(BusqGroup)
    
        //SUBMIT
        let submitButton = document.createElement("button")
        submitButton.setAttribute('type', 'button')  
        submitButton.setAttribute('class', 'btn btn-default')  
        submitButton.setAttribute('onclick', 'busqueda()')  
        submitButton.innerText = 'Enviar'
        //SUBMIT        
        let result = document.createElement('div')
        result.setAttribute('id', 'result')

        formulario.appendChild(submitButton)
        content.appendChild(formulario)
        content.appendChild(result)

       }
    }
    

function busqueda(){

        let input = document.getElementById("busq").value;  
        
        var resultados = document.getElementById('result')
        resultados.innerHTML = ''

        let ingrediente = document.createElement("ul")
        let receta = document.createElement("ul")

        var titIngredientes = document.createElement('p');
        titIngredientes.innerText = 'Ingredientes:'
        var titRecetas = document.createElement('p');
        titRecetas.innerText = 'Recetas:'

        for (i=0; i<listaIngredientes.length; i++) {  
            if (listaIngredientes[i].getName() === input){
                    var ingFound = document.createElement("li")
                    var ingDesc = document.createElement('p')
                    ingFound.innerText=listaIngredientes[i].getName()
                    ingDesc.innerText=listaIngredientes[i].getDescripcion()
                    ingFound.appendChild(ingDesc)
                    ingrediente.appendChild(ingFound)
                }                
            }  
        for (i=0; i<listaRecetas.length; i++) {   
            if (listaRecetas[i].getName() === input){  
                var recFound = document.createElement("li")
                recFound.innerText=listaRecetas[i].getName()
                recFound.setAttribute('onclick', 'mostrarReceta('+i+')')
                receta.appendChild(recFound)              
            } 
        resultados.appendChild(titIngredientes)  
        resultados.appendChild(ingrediente)
        resultados.appendChild(titRecetas) 
        resultados.appendChild(receta)
        content.appendChild(resultados)
    }
}


////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
let undefinedLocation = 'fotos/undefined.jpeg'

let miel = new objIngrediente("miel","dulce, pegajosa")
let curry = new objIngrediente("Curry","to rico, ligeramente picante")
let pollo = new objIngrediente("Pollo","genérico. Incinera cualquier cosa que toque mientras esté crudo")
let avena = new objIngrediente("Avena","Excelente para desayunos")
let bistec = new objIngrediente("Bistec","De alta calidad, mejor dejar medio crudo")
let harina = new objIngrediente("Harina","Imprescindible para bollos y panes")
let leche = new objIngrediente("Leche","Universal bebida de desayuno")
let patatasFritas = new objIngrediente("Patatas Fritas","El mejor acompañante jamás creado")

let listaIngredientes = [miel, curry, pollo, avena, bistec, harina, leche, patatasFritas]


let a = new objReceta("Pollo al Curry","Pollo con curry, suele ir acompañado de arroz",[listaIngredientes[1].getName(),listaIngredientes[2].getName()], 'fotos/pollo al curry.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let b = new objReceta("Desayuno de Avena","Avena con leche y miel, llena más de lo que esperarías. Sientete libre de acompañarlo con frutas de cualquier tipo",[listaIngredientes[3].getName(),listaIngredientes[6].getName(), listaIngredientes[0].getName()], 'fotos/avena.png', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let c = new objReceta("Pollo con patatas al horno","Algo simple, para cuando vas corto de tiempo",[listaIngredientes[2].getName(),listaIngredientes[2].getName(7)], 'fotos/Pollo con patatas.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let d = new objReceta("Bistec con patatas","Recomendamos acompañarlo de alguna salsa sencillita",[listaIngredientes[4].getName(),listaIngredientes[2].getName(7)], 'fotos/bistec.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let listaRecetas = [a,b,c,d]



let pasosPlaceholder = []




