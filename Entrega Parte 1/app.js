
//Es nuestro elemento principal. Tiene nombre, descripción (string), ingredientes (array of objIngrediente), foto (string), y pasos (array of string)
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

//Es nuestro elemento secundario. Tiene nombre, descripción (string)
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

//Cuando haya cargado el html, llamamos a pagRecetas, que cargará las recetas de ejemplo
$('Index.html').ready(function() {
    pagRecetas()}
)

   
//Cambia la clase de targetTab a activa, y todas las otras tabs a inactiva
function setActiveNavTab(targetTab){ //could be done better by giving current and previous tab, so that only the previous tab is accesed and disabled
    let tabs = ['recetas', 'ingredientes', 'crearReceta', 'crearIngrediente', 'buscar']
    
    
    for (let tab of tabs) { //makes all tabs inactive
        let content = document.getElementById(tab)
        content.setAttribute("class",  "inactive")
    } 

    //Si estamos accediendo a la vista detallada de alguna receta, podemos pasar 'disable' para que no active ningun navtab
    if (targetTab!=='disable'){ 
        let content = document.getElementById(targetTab) //makes current tab active
        content.setAttribute("class",  "active")
    }
}

////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////MOSTRAR RECETA/INGREDIENTE////////////////////////////////////////////////////////////////

//Se encarga de cargar las recetas ejemplo, y cualquiera que haya guardado el usuario y mostrarlas en html 
function pagRecetas() {

    //Cogemos el nav-tab de recetas y comprobamos si está activo. Si lo está, no hacemos nada
    let tab = document.getElementById('recetas') 
    if (tab.getAttribute("class") == 'inactive'){
    
    
    //Activa la nav-tab de recetas
    setActiveNavTab('recetas')

    //Quita todo lo que hubiera antes
    let content = document.getElementById('content')
    content.innerHTML = ""

    //creamos el boton de crear receta. Se mostrará debajo de todos los demás elementos, 
    //pero lo creamos aquí para que pueda aparecer si no tienes recetas sin tener que duplicar código
    let btnCrearReceta = document.createElement("button")
    btnCrearReceta.setAttribute('class', 'btn btn-default inputBg')  
    btnCrearReceta.setAttribute('onclick','pagCrearReceta()')
    btnCrearReceta.innerText = 'Crear Nueva Receta'

    //Comprobar si hay al menos una receta, y en caso negativo, poner un texto que lo indique. En caso afirmativo, escribe el titulo
    let titulo = document.createElement("h1")
    if (listaRecetas.length == 0){
        titulo.innerText = 'No tienes ninguna receta! Ve a \'Crear Receta\' para empezar a usar tu recetario, o haz click en el botón Crear Nueva Receta'
        content.appendChild(titulo)
        content.appendChild(btnCrearReceta)
        return
    } else {
        titulo.innerText = '¡He aquí tus preciadas recetas!'
        content.appendChild(titulo)
    }
    
    //Creamos el div que contendrá las recetas
    var elementos = document.createElement("div")
    elementos.setAttribute("class",  "wrapper")

    //Para cada receta guardada, creamos un div y le metemos todos los elementos de la receta
    for (let i = 0; i < listaRecetas.length; i++){

        var elemento = document.createElement("div")               //Div contenedor
        elemento.setAttribute("class",  "receta")                  //Clase   
        elemento.setAttribute("onclick",  "mostrarReceta("+i+")")  //onclick

        let foto = document.createElement("img")                   //imagen
        foto.setAttribute('src',listaRecetas[i].foto)              //source
        foto.setAttribute('class', 'image')                        //clase

        let nombre = document.createElement("h2")                 //nombre
        nombre.innerText = listaRecetas[i].getName()              //contenidos
  
        let desc = document.createElement("p")                    //descripcion
        desc.innerText = listaRecetas[i].getDescription()         //contenidos

        //añadimos todos los elementos de la receta al div contenedor, y este al que contiene todas las recetas
        elemento.appendChild(foto)                                 
        elemento.appendChild(nombre)
        elemento.appendChild(desc)
        elementos.appendChild(elemento)

        //Si no hay suficientes elementos para llenar la última fila, centramos los elementos que haya
        //Para ello, si sólo hay un elemento, añadimos antes de él un elemento vacío transparente (span 2)
        //Si hay dos elementos, añadimos antes de ambos y después suya, dos div vacíos transparentes (span 1)
        if ( listaRecetas.length%3==1 && i == listaRecetas.length-2) {
            var extra = document.createElement("div")
            extra.setAttribute("class",  "receta transparent")
            elementos.appendChild(extra)
        }

        if (listaRecetas.length%3==2 && (i == listaRecetas.length-3 || i == listaRecetas.length-1)){
            var extra1 = document.createElement('div')
            elementos.appendChild(extra1)
        }
    }
    
    //añadimos a la pagina la lista de las recetas y el botón que creamos al principio de la función
    content.appendChild(elementos)
    content.appendChild(btnCrearReceta)
}
}

//Se encarga de cargar los ingredientes ejemplo, y cualquiera que haya guardado el usuario, y mostrarlas en html
function pagIngredientes() {
    
    //Activamos el nav-tab de ingredientes si no lo está
    //No podemos hacer que no haga nada si está activa como con los otros, ya que, borramos elementos desde esta misma página,
    //y debe actualizarse cada vez que borremos uno
    let tab = document.getElementById('ingredientes') 
    if (tab.getAttribute("class") == 'inactive'){
        setActiveNavTab('ingredientes')
    }

    //Borramos lo que hubiera antes
    let content = document.getElementById('content');
    content.innerHTML = ""

    //Creamos el div que contendrá todos los ingredientes
    var elementos = document.createElement("div")
    elementos.setAttribute("class", "scrollbarList container")

    //por cada ingrediente ejemplo o creado, creamos un div, metemos nombre y descripción en él, y lo añadimos a la lista
    for(let i = 0; i < listaIngredientes.length; i++){
        
        ingrediente = listaIngredientes[i]
        var elemento = document.createElement("div")     //creamos el "ingrediente"
        elemento.setAttribute("class",  "ingrediente")   //añadimos la clase
        elemento.setAttribute('id', 'ingredientBox')     //añadimos el id para que tenga estilo

        let nombre = document.createElement("h3")        //damos nombre al ingrediente
        nombre.innerText = ingrediente.getName()

        let desc = document.createElement("p")            //damos desc al ingrediente
        desc.innerText = ingrediente.getDescripcion()
        

        let btnModificar = document.createElement("button")                 //Creamos botón         btn Modificar    
        btnModificar.setAttribute('class', 'btn btn-default inputBg')       //clase                 btn Modificar    
        btnModificar.setAttribute('onclick','modificarIngrediente('+i+')')  //onclick               btn Modificar    
        btnModificar.innerText = 'Modificar Ingrediente'                    //contenido             btn Modificar    
        
        let btnBorrar = document.createElement("button")                    //Creamos botón         btn Borrar   
        btnBorrar.setAttribute('class', 'btn btn-default inputBg')          //clase                 btn Borrar
        btnBorrar.setAttribute('onclick','borrarIngrediente('+i+')')        //onclick               btn Borrar   
        btnBorrar.innerText = 'Borrar Ingrediente'                          //contenido             btn Borrar

        //añadimos todos los elementos al ingrediente
        elemento.appendChild(nombre)
        elemento.appendChild(btnModificar)
        elemento.appendChild(desc)
        elemento.appendChild(btnBorrar)
        elementos.appendChild(elemento) //añadimos le ingrediente a la lista 
    }
    //añadimos la lista de ingredientes a la página
    content.appendChild(elementos)
}

//Muestra los detalles de una receta dado su index
function mostrarReceta(i){
    setActiveNavTab('disable') //desactivamos todas las nav-tabs

    //Borramos lo que hubiera antes 
    let content = document.getElementById('content') 
    content.innerHTML = ''
    
    //Creamos el div al que meteremos los elementos de la receta
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

        //iteramos por los pasos de la receta, y los vamos añadiendo como elementos de una ordered list
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

        //iteramos por los ingredientes de la receta, y los vamos añadiendo como elementos de una unordered list
    let ingredientes = document.createElement("ul")
    for (let ing of listaRecetas[i].getIngredientes()){
        var ingrediente = document.createElement("li")
        ingrediente.innerText=ing
        ingredientes.appendChild(ingrediente)
    }
    elemento.appendChild(ingTitulo)
    elemento.appendChild(ingredientes)


    //crear botones
    let goBackButton = document.createElement("button")           //Creamos el boton    btn Volver
    goBackButton.setAttribute('class', 'btn btn-default inputBg') //Clase               btn Volver         
    goBackButton.setAttribute("type",  "button")                  //Tipo                btn Volver
    goBackButton.setAttribute("onclick",  "pagRecetas()")         //Onclick             btn Volver
    goBackButton.innerText = 'Volver'                             //Contenido           btn Volver

    let btnModificar = document.createElement("button")            //Creamos el boton    btn Modificar
    btnModificar.setAttribute('class', 'btn btn-default inputBg')  //Clase               btn Modificar                             
    btnModificar.setAttribute('onclick','modificarReceta('+i+')')  //Onclick             btn Modificar        
    btnModificar.innerText = 'Modificar Receta'                    //Contenido           btn Modificar      
    
    let btnBorrar = document.createElement("button")               //Creamos el boton   btn Borrar
    btnBorrar.setAttribute('class', 'btn btn-default inputBg')     //Clase              btn Borrar                             
    btnBorrar.setAttribute('onclick','borrarReceta('+i+')')        //Onclick            btn Borrar   
    btnBorrar.innerText = 'Borrar Receta'                          //Contenido          btn Borrar   

    //añadimos la receta y los botones a la página
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

//Crea y carga el formulario utilizado para crear recetas nuevas
function pagCrearReceta() {

    //Cogemos el nav-tab de Crear Receta y comprobamos si está activo. Si lo está, no hacemos nada
    let tab = document.getElementById('crearReceta')
    if (tab.getAttribute("class") == 'inactive'){

        setActiveNavTab('crearReceta')

        //Borramos todo lo de antes
        let content = document.getElementById('content')
        content.innerHTML = ""

        //Añadimos el título
        let titulo = document.createElement("h2")
        titulo.innerText = 'Crea una nueva receta!'
        titulo.setAttribute('id','rTit')
        content.appendChild(titulo)

        //Creamos el formulario
        let formulario = document.createElement("form")
        formulario.setAttribute('role', 'form')
        formulario.setAttribute('id', 'recForm')

        //Creamos los distintos campos del formulario
        //NOMBRE
        let nameGroup = document.createElement("div")             //Creamos GRUPO               NOMBRE
        nameGroup.setAttribute('class', 'form-group')             //clase

        let nameLabel = document.createElement("label")           //Creamos ETIQUETA            NOMBRE
        nameLabel.setAttribute('for', 'rName')                    //for                         NOMBRE
        nameLabel.innerText = 'Nombre: '                          //Conteindo                   NOMBRE

        let nameInput = document.createElement("input")           //Creamos INPUT               NOMBRE
        nameInput.setAttribute('type', 'text')                    //Type                        NOMBRE
        nameInput.setAttribute('class', 'form-control')           //Class                       NOMBRE
        nameInput.setAttribute('id', 'rName')                     //Id                          NOMBRE
        nameInput.setAttribute('placeholder', 'Un nombre bonito') //Placeholder                 NOMBRE

            //añadimos label y nombre al formulario
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

        let descInput = document.createElement("textarea") //CAMPO DE LA DESCRIPCION
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
        submitPaso.setAttribute('class', 'btn btn-default inputBg')  
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
        let titIngredientes = document.createElement('p') //añadimos un titulo para los ingredientes
        titIngredientes.innerText = 'Ingredientes: ' 
        titIngredientes.setAttribute("style", "font-weight:700")
        let elementos = document.createElement("div")
        elementos.setAttribute("class", "container")
        elementos.setAttribute("class", "scrollbar")
        let ingGroup = document.createElement("div")
        ingGroup.setAttribute('class', 'form-group') 

        for (let i=0;i<listaIngredientes.length;i++){
            var ingLabel = document.createElement("label")
            ingLabel.setAttribute('for', 'ing'+i)
            ingLabel.setAttribute('id', 'ingLabel'+i)   
            ingLabel.innerText = listaIngredientes[i].getName() 
            var ingInput = document.createElement("input")      
            ingInput.setAttribute('type', 'checkbox')           //Type
            ingInput.setAttribute('id', 'ing'+i)                //Id
            ingInput.setAttribute('value', i)                   //Value

            
            elementos.appendChild(ingInput)
            elementos.appendChild(ingLabel)
            elementos.appendChild(document.createElement("br"))
            ingGroup.appendChild(elementos)
        }
        let btnCrearNuevoIng = document.createElement("div")
        btnCrearNuevoIng.setAttribute('class', 'btn btn-default') 
        btnCrearNuevoIng.setAttribute('onclick', 'formCrearIngrediente()')
        
        formulario.appendChild(titIngredientes)
        formulario.appendChild(ingGroup)
        //INGREDIENTES


        //SUBMIT
        let submitButton = document.createElement("button")
        submitButton.setAttribute('type', 'reset')
        submitButton.setAttribute('class', 'btn btn-default inputBg')  
        submitButton.setAttribute('onclick', 'guardarReceta('+listaRecetas.length+')')  
        submitButton.setAttribute('id', 'btnSubmitRec') 
        submitButton.innerText = 'Enviar'
        
        formulario.appendChild(submitButton)
        //SUBMIT

        content.appendChild(formulario)
    }
}

//Toma los valores del formulario y los guarda en la posición i de la listaRecetas (sirve tanto para crear como para modificar)
function guardarReceta(i){
    //cojemos los valores del formulario
    let nombre = document.getElementById('rName').value
    let descripcion = document.getElementById('rDesc').value
    let foto = document.getElementById('rFoto').value
    let pasos = []
    let ingredientes = []
    
    //si no han metido nada en el campo de la foto, ponemos una predefinida
    if (foto === '' || foto === undefined){
        foto = undefinedLocation 
    }

    //Si hay otra receta con el mismo nombre, avisamos
    for (rec of listaRecetas){
        if (rec.getName()===nombre) {
            if (!confirm('Ya existe una receta con ese nombre, ¿seguro que quieres crear otra?')){
                return}
        }
    }

    //Guardamos los ingredientes marcados (los ingredientes son una checkbox)
    //Para ello, iteramos por las checkboxes, y, si está checkeada, guardamos el valor en la posición n, y sumamos uno a n
    let n=0
    for (let ingIndex=0;ingIndex<listaIngredientes.length;ingIndex++){
        var ingrediente = document.getElementById('ing'+ingIndex)
        if (ingrediente.checked){
            ingredientes[n] = listaIngredientes[ingrediente.value].getName()
            n++
        }
    }

    //Iteramos por los pasos que haya añadido el usuario, guardando su valor en la lista (los pasos son li dentro de una ol)
    let pasosArray = document.getElementById('pasosList').children
    if (pasosArray.length === 0 || pasosArray.length === undefined) {alert('La receta debe tener al menos un paso'); return} //Si no hay pasos, cancelamos el guardado
    for (let ind = 0; ind<pasosArray.length;ind++){
        pasos[ind] = pasosArray.item(ind).firstChild.wholeText
    }

    resetPasos() //borra los pasos y resetea el input

    //Comprobamos que haya metido nombre, descripción, e ingredientes, y, si los ha metido, guardamos los valores
    if (nombre==='' || descripcion==='' ){
        alert('Debe haber tanto nombre como descripción')
    } else if (ingredientes.length==0){alert('La receta debe tener al menos un ingrediente')
    } else {
        let receta = new objReceta(nombre,descripcion, ingredientes, foto, pasos)
        listaRecetas[i] = receta
        
    }
}

//////////////////////// PASOS ////////////////////////
//////////////////////// PASOS ////////////////////////

//Toma el valor del input (o del parámetro valor), y añade un li a la ol con ese valor, y botones para modificarlo y borrarlo
//Además, cambia el input, su label, y su botón, para aumentar el paso en el que están. i es el índice del paso en el que estamos (0 indexed)
function crearPaso(i,valor){
    
    let inpPasos = document.getElementById('rPasos')
    if (valor === undefined && inpPasos.value === ''){alert('El paso a introducir no puede ser vacío');return} 

    incrementarPaso() //actualiza el input, label, y botón

    //añadir el paso i a la ordered list
    let listaPasos = document.getElementById('pasosList')
    let pasoI = document.createElement('li')
    pasoI.setAttribute('id','idPaso'+i)
    if (valor===undefined){
        pasoI.innerText = inpPasos.value 
    } else {pasoI.innerText = valor}
    
    //Crear boton de borrar paso
    let btnBorrarPasoI = document.createElement('button')
    btnBorrarPasoI.setAttribute('onclick','borrarPaso('+i+')')
    btnBorrarPasoI.setAttribute('type','button')
    btnBorrarPasoI.setAttribute('class', 'btn btn-default')  
    btnBorrarPasoI.innerText = 'Borrar paso '+ (i+1) 

    //Crear boton de modificar paso
    let btnModificarPasoI = document.createElement('button')
    btnModificarPasoI.setAttribute('onclick','modificarPaso('+i+')')
    btnModificarPasoI.setAttribute('type','button')
    btnModificarPasoI.setAttribute('class', 'btn btn-default')  
    btnModificarPasoI.innerText = 'Modificar paso '+ (i+1)

    //añadir botones al paso, y el paso a la lista
    pasoI.appendChild(btnBorrarPasoI)
    pasoI.appendChild(btnModificarPasoI)
    listaPasos.appendChild(pasoI)

    inpPasos.value='' //reseteamos el valor del input
}

//borra el paso con índice i de la ol
function borrarPaso(i) {
    if (!confirm('Seguro que quieres eliminar este paso?')){return}
    let listaPasos = document.getElementById('pasosList')
    listaPasos.removeChild(listaPasos.children.item(i))
    incrementarPaso(i) //como hemos borrado un paso, hay que actualizar el formulario, restándole uno
}

//Actualiza los campos del formulario para que muestren el paso adecuado. Para añadir pasos, i se deja undefined.
//Si pasamos i es porque estamos borrando un paso.
function incrementarPaso(i){
    let pasosActualizar = document.getElementById('pasosList').children //Hijos de la ol; los li
    let siguientePaso = pasosActualizar.length + 1
    if (siguientePaso===undefined){siguientePaso=1}
    if (i===undefined){siguientePaso++} //hace falta sumarle 2 porque al crear un paso actualizamos antes de meter el paso nuevo

    //cambiar label
    let pLabel = document.getElementById('pasosLabel')
    pLabel.innerText = 'Introduce el paso '+(siguientePaso)+' de la receta'

    //cambiar button
    let pBtn = document.getElementById('pasosBtn')
    pBtn.innerText = 'Enviar paso '+(siguientePaso)
    pBtn.setAttribute('onclick', 'crearPaso('+(siguientePaso-1)+')') //es siguientePaso-1 porque queremos que sea el index

    //Modificar <input>
    let inpPasos = document.getElementById('rPasos')
    inpPasos.setAttribute('placeholder','Paso '+ (siguientePaso))

    //Si han pasado una i -> Estamos eliminando -> debemos actualizar los botones porque su indice ha cambiado
    //Iteramos por todos los pasos, y en cada paso le cambiamos a los botones la id, onclick, y contenido para que coincida con su posición
    if (i!=undefined){
        for (let n=0;n<pasosActualizar.length;n++){ 
            var li = pasosActualizar.item(n)
            li.setAttribute('id', 'idPaso'+n)
            li.firstElementChild.setAttribute('onclick','borrarPaso('+n+')')
            li.firstElementChild.innerText = 'Borar paso ' + (n+1)
            li.children.item(1).setAttribute('onclick','modificarPaso('+n+')')
            li.children.item(1).innerText = 'Modificar paso ' + (n+1)
        }
    }
}

//Al darle al boton de modificar un paso, borramos el li, y lo sustituimos por un input con sus botones de enviar y cancelar
function modificarPaso(i){
    let listaPasos = document.getElementById('pasosList')
    let paso = listaPasos.children.item(i)

    //Input contenido
    let inpPaso = document.createElement('input')
    inpPaso.setAttribute('type','text')
    inpPaso.setAttribute('id','inpPasos')
    inpPaso.setAttribute('value',paso.firstChild.wholeText)

    //Botón Enviar
    let inpBtnEnviar = document.createElement('button')
    inpBtnEnviar.setAttribute('id','inpBtnEnviar')
    inpBtnEnviar.setAttribute('type','button')
    inpBtnEnviar.setAttribute('onclick','sendModifiedPaso('+i+',1)')
    inpBtnEnviar.innerText = 'Guardar cambios'

    //Botón Cancelar
    let inpBtnCancelar = document.createElement('button')
    inpBtnCancelar.setAttribute('type','button')
    inpBtnCancelar.setAttribute('id','inpBtnCancelar')
    inpBtnCancelar.setAttribute('onclick','sendModifiedPaso('+i+',0)')
    inpBtnCancelar.innerText = 'Cancelar'

    //Usamos insertBefore para mantener el orden
    listaPasos.insertBefore(inpPaso,paso)
    listaPasos.insertBefore(inpBtnEnviar,paso)
    listaPasos.insertBefore(inpBtnCancelar,paso)

    placeholderString = paso.firstChild.wholeText //guardamos el contenido del paso en una variable global por si quiere cancelar

    listaPasos.removeChild(paso)
}

//Es la función que se llama cuando le das a cualquier botón al modificar paso.
//Crea un li, le mete el valor original si cancelas, o lo que ponga en el input si envías, y llama a borrarFormPaso()
// i es el índice del paso que estamos modificando.
// send toma valores de 0 o 1, donde 0 es cancelar y 1 guardar
function sendModifiedPaso(i,send){
    let listaPasos = document.getElementById('pasosList')
    let pasoI = document.createElement('li')
    let valor = 'Error al modificar' //Inicializamos valor en el bloque de la función para poder utilizarlo más adelante

    if (send===1){valor = document.getElementById('inpPasos').value}
    else {valor = placeholderString}

    pasoI.setAttribute('id','idPaso'+i) 
    pasoI.innerText = valor

    //crear boton de borrar
    let btnBorrarPasoI = document.createElement('button')
    btnBorrarPasoI.setAttribute('onclick','borrarPaso('+i+')')
    btnBorrarPasoI.setAttribute('type','button')
    btnBorrarPasoI.setAttribute('class', 'btn btn-default')  
    btnBorrarPasoI.innerText = 'Borrar paso '+ (i+1)

    //crear boton de modificar
    let btnModificarPasoI = document.createElement('button')
    btnModificarPasoI.setAttribute('onclick','modificarPaso('+i+')')
    btnModificarPasoI.setAttribute('type','button')
    btnModificarPasoI.setAttribute('class', 'btn btn-default')  
    btnModificarPasoI.innerText = 'Modificar paso '+ (i+1)

    pasoI.appendChild(btnBorrarPasoI)
    pasoI.appendChild(btnModificarPasoI)
    listaPasos.insertBefore(pasoI,document.getElementById('inpPasos'))

    borrarFormPaso() //borramos el formulario
}

//Borra el formulario que se crea para modificar los pasos
function borrarFormPaso(){
    let listaPasos = document.getElementById('pasosList')
    listaPasos.removeChild(document.getElementById('inpPasos'))
    listaPasos.removeChild(document.getElementById('inpBtnEnviar'))
    listaPasos.removeChild(document.getElementById('inpBtnCancelar'))
}

//Vacía la ol De los pasos, y reinicia el valor del formulario (para que vuelva a decir paso 1)
function resetPasos(){
    let listaPasos = document.getElementById('pasosList')
    listaPasos.innerHTML = ''

    incrementarPaso(0)
}
//////////////////////// PASOS ////////////////////////
//////////////////////// PASOS ////////////////////////

////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR RECETA////////////////////////////////////////////////////////////////

//Confirma que quiere borrar, borra la receta en la posición dada, y recarga la pagina de recetas
function borrarReceta(i){
    if (confirm('¿Seguro que quieres borrar esta receta?')){
        listaRecetas.splice(i,1)
        pagRecetas()
    }
}

//Usa pagCrearReceta para crear el formulario, y modifica el .value de cada campo para que coincidan con los valores almacenados para ellos
//Itera por los checkboxes de los ingredientes, seleccionando los que tenga la receta
//Utiliza crearPaso para añadir los pasos de la receta.
//Por último, añade botones de confirmar y cancelar
function modificarReceta(i){
    pagCrearReceta()
    document.getElementById('rName').value = listaRecetas[i].getName()
    document.getElementById('rDesc').value = listaRecetas[i].getDescription()
    document.getElementById('rFoto').value = listaRecetas[i].getFoto()
    document.getElementById('rTit').innerText = 'Actualiza tu maravillosa receta'

    //Ponemos todos los pasos en la página
    for(let n=0; n<listaRecetas[i].getPasos().length; n++){
        crearPaso(n,listaRecetas[i].getPasos()[n])
    }

    //Checkeamos los ingredientes que contenga la receta
    let ingredientes = listaRecetas[i].getIngredientes()
    for(let n=0; n<listaIngredientes.length; n++ ){
        var ing = document.getElementById('ingLabel'+n)
        var ingCheck = document.getElementById('ing'+n)
        if(ingredientes.includes(ing.innerText)){
            ingCheck.checked = true
        } 
    }

    //Creamos los botones
    btnGuardar = document.getElementById('btnSubmitRec')
    btnGuardar.setAttribute('onclick', 'guardarYVolveraLaReceta('+i+')')
    btnGuardar.innerText = 'Guardar cambios'

    formulario = document.getElementById('recForm')
    btnCancelar = document.createElement('button')
    btnCancelar.setAttribute('class', 'btn btn-default inputBg')  
    btnCancelar.setAttribute('type','button')
    btnCancelar.setAttribute('onclick','mostrarReceta('+i+')')
    btnCancelar.innerText = 'Descartar cambios'
    formulario.appendChild(btnCancelar)
    
}

//Como al modificar recetas es necesario que vuelva a la vista de la receta modificada, primero guardamos la receta, y luego cargamos su información
function guardarYVolveraLaReceta(i){
    guardarReceta(i)
    mostrarReceta(i)
}

////////////////////////////////////////////////////////////////BORRAR/MODIFICAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BORRAR/MODIFICAR INGREDIENTE////////////////////////////////////////////////////////////////

//Confirma que quiere borrar, borra el ingrediente en la posición dada, y recarga la pagina de ingredientes
function borrarIngrediente(i){
    if (confirm('¿Seguro que quieres borrar este ingrediente?')){
        listaIngredientes.splice(i,1)
        pagIngredientes()
    }
}

//Usa pagCrearIngrediente para crear el formulario, y modifica el .value de cada campo para que coincidan con los valores almacenados para ellos
//Crea y añade botones de confirmar y cancelar
function modificarIngrediente(i){
    //Crea el formulario
    pagCrearIngrediente()

    //Cambia los valores del formulario
    document.getElementById('iName').value = listaIngredientes[i].getName()
    document.getElementById('iDesc').value = listaIngredientes[i].getDescripcion()
    document.getElementById('iTit').innerText = 'Actualiza tu maravilloso ingrediente'

    //Crea los botones
    btnGuardar = document.getElementById('btnSubmitIng')
    btnGuardar.setAttribute('onclick', 'guardarIngrediente('+i+')')
    btnGuardar.innerText = 'Guardar cambios'

    formulario = document.getElementById('ingForm')
    btnCancelar = document.createElement('button')
    btnCancelar.setAttribute('class', 'btn btn-default inputBg')  
    btnCancelar.setAttribute('type','button')
    btnCancelar.setAttribute('onclick','pagIngredientes()')
    btnCancelar.innerText = 'Descartar cambios'
    formulario.appendChild(btnCancelar)
}

////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////CREAR INGREDIENTE////////////////////////////////////////////////////////////////

//Crea y carga el formulario utilizado para crear ingredientes nuevos
function pagCrearIngrediente() {
    let tab = document.getElementById('crearIngrediente') 
    
    if (tab.getAttribute("class") == 'inactive'){
    
    
        //Activamos el nav-tab de Crear Ingrediente
        setActiveNavTab('crearIngrediente')

        //Quitar todo el contenido anterior
        let content = document.getElementById('content')
        content.innerHTML = ""
        
        //Crear el título
        let titulo = document.createElement("h2")
        titulo.innerText = 'Crea un nuevo Ingrediente!'
        titulo.setAttribute('id','iTit')
        content.appendChild(titulo)
        

        //Creamos el formulario
        let formulario = document.createElement("form")
        formulario.setAttribute('role', 'form')
        formulario.setAttribute('id', 'ingForm')
        
        //Creamos el campo de texto donde introducir el nombre
        let nameGroup = document.createElement("div")                 //Grupo       NOMBRE
        nameGroup.setAttribute('class', 'form-group') 
        let nameLabel = document.createElement("label")               //Label       NOMBRE
        nameLabel.setAttribute('for', 'name')  
        nameLabel.innerText = 'Nombre: '    
        let nameInput = document.createElement("input")               //Input       NOMBRE
        nameInput.setAttribute('type', 'text')  
        nameInput.setAttribute('class', 'form-control')
        nameInput.setAttribute('id', 'iName')
        nameInput.setAttribute('placeholder', 'Un nombre bonito')

        //Hacemos que el campo de nombre pertenezca a el formulario
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        formulario.appendChild(nameGroup)

        //Creamos el campo de texto donde introducir la descripción
        let descGroup = document.createElement("div")                 //Grupo       DESCRIPCION
        descGroup.setAttribute('class', 'form-group') 
        let descLabel = document.createElement("label")               //Label       DESCRIPCION
        descLabel.setAttribute('for', 'desc')  
        descLabel.innerText = 'Descripción: '    
        let descInput = document.createElement("textarea")            //Input       DESCRIPCION
        descInput.setAttribute('type', 'text')  
        descInput.setAttribute('class', 'form-control')
        descInput.setAttribute('id', 'iDesc')
        descInput.setAttribute('placeholder', 'Una descripción detallada')

        //Hacemos que el campo de descripción pertenezca a el formulario
        descGroup.appendChild(descLabel)
        descGroup.appendChild(descInput)
        formulario.appendChild(descGroup)

        //SUBMIT
        let submitButton = document.createElement("button")
        submitButton.setAttribute('id', 'btnSubmitIng')  
        submitButton.setAttribute('type', 'reset')  
        submitButton.setAttribute('class', 'btn btn-default inputBg')  
        submitButton.setAttribute('onclick', 'guardarIngrediente('+listaIngredientes.length+')')  
        submitButton.innerText = 'Enviar'

        formulario.appendChild(submitButton) 
        //SUBMIT
        
        //Metemos el formulario en el HTML
        content.appendChild(formulario)

    }
}

//Toma los valores del formulario y los guarda en la posición i de la listaIngredientes (sirve tanto para crear como para modificar)
function guardarIngrediente(i){
    let nombre = document.getElementById('iName').value
    let descripcion = document.getElementById('iDesc').value

    //Comprobamos si existe un ingrediente con el mismo nombre
    for (ing of listaIngredientes){
        if (ing.getName()===nombre) {
            alert('Ya existe un ingredinete con ese nombre')
            return
        }
    }
    //Si ha metido tanto nombre como descripción, añadimos el ingrediente a listaIngredientes en la posición i (sustituyendo lo que hubiera antes)
    if (nombre==='' || descripcion===''){
        alert('Ambos campos deben estar rellenos')
    } else {
        let ingrediente = new objIngrediente(nombre,descripcion)
        listaIngredientes[i] = ingrediente
    }

}

////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////BUSCAR////////////////////////////////////////////////////////////////

//Crea una página con un formulario para buscar recetas o ingredientes
function pagBuscar() {
    //Comprobamos si el tab de Buscar es activo, y si lo es, no hacemos nada
    let tab = document.getElementById('buscar') 
    if (tab.getAttribute("class") == 'inactive'){
    
    
        //Activamos el nav-tab de Buscar
        setActiveNavTab('buscar')

        //Quitar todo el contenido anterior
        let content = document.getElementById('content')
        content.innerHTML = ""
        
        //Ponemos el título
        let titulo = document.createElement("h2")
        titulo.innerText = 'Busca entre tus recetas e ingredientes!'
        content.appendChild(titulo)

        //Creamos el formulario
        let formulario = document.createElement("form")
        formulario.setAttribute('role', 'form')
        
        let BusqGroup = document.createElement("div")           //Grupo         BUSCAR
        BusqGroup.setAttribute('class', 'form-group') 
        let BusqLabel = document.createElement("label")         //Label         BUSCAR
        BusqLabel.setAttribute('for', 'busq')  
        BusqLabel.innerText = 'Busca: '    
        let BusqInput = document.createElement("input")         //Input         BUSCAR
        BusqInput.setAttribute('type', 'text')  
        BusqInput.setAttribute('class', 'form-control')
        BusqInput.setAttribute('id', 'busq')
        BusqInput.setAttribute('placeholder', 'Busca un ingrediente o una receta')

        //Placeholder, para que no ocurra nada al hacer intro. Elaboramos esto al final del documento.
        let phGroup = document.createElement("div")
        phGroup.setAttribute('class', 'form-group') 
        let phInput = document.createElement("input")
        phInput.setAttribute('type', 'text')  
        phInput.setAttribute('class', 'form-control')
        phInput.style.display = 'none'                  //lo ocultamos
        phGroup.appendChild(phInput)

        //Añadimos los elementos al grupo de búsqueda
        BusqGroup.appendChild(BusqLabel)
        BusqGroup.appendChild(BusqInput)

        //Añadimos el grupo de búsqueda y el placeholder al formulario
        formulario.appendChild(BusqGroup)
        formulario.appendChild(phGroup)
    
        //SUBMIT
        let submitButton = document.createElement("button")
        submitButton.setAttribute('type', 'button')  
        submitButton.setAttribute('class', 'btn btn-default inputBg')  
        submitButton.setAttribute('onclick', 'busqueda()')  
        submitButton.innerText = 'Enviar'
        formulario.appendChild(submitButton)
        //SUBMIT        

        //Creamos un div vacío en el que pondremos los resultados
        let result = document.createElement('div')
        result.setAttribute('id', 'result')

        //Añadimos el formulario y el div vacío a la página
        content.appendChild(formulario)
        content.appendChild(result)

        //Añadimos un event handler, para buscar al pulsar intro (más bien al soltar la tecla).
        //Si quitamos el if, ocurre al soltar cada tecla, es decir, te van apareciendo las recetas e ingredientes según escribes.
        $('#busq').keyup(function(e) {if (e.which == 13){busqueda()}}) 
       }
}

//Toma el valor del input de pagBuscar, y muestra recetas e ingredientes con nombres iguales al input
function busqueda(){

    //Guardamos el elemento a buscar
    let input = document.getElementById("busq").value;  
    
    //Borramos los resultados de búsquedas previas
    var resultados = document.getElementById('result')
    resultados.innerHTML = ''

    //Creamos listas y títulos para las recetas e ingredientes encontrados
    let ingrediente = document.createElement("ul")
    let receta = document.createElement("ul")
    let titIngredientes = document.createElement('h3');
    titIngredientes.innerText = 'Ingredientes:'
    let titRecetas = document.createElement('h3');
    titRecetas.innerText = 'Recetas:'

    //Iteramos por los ingredientes, y si encontramos alguno que coincida exactamente (not case sensitive) con el input del usuario, 
    //añadimos el ingrediente (tanto nombre como descripción) a la ul ingrediente
    for (i=0; i<listaIngredientes.length; i++) {  
        if (listaIngredientes[i].getName().toLowerCase() === input.toLowerCase()){
                var ingFound = document.createElement("li")
                var ingDesc = document.createElement('p')
                ingFound.innerText=listaIngredientes[i].getName()
                ingDesc.innerText=listaIngredientes[i].getDescripcion()
                ingFound.appendChild(ingDesc)
                ingrediente.appendChild(ingFound)
            }                
        }  
    
    //Iteramos por las recetas, y si encontramos alguna que coincida exactamente (not case sensitive) con el input del usuario, 
    //añadimos el nombre de la receta (con un link a la vista de esa receta) a la ul receta
    for (i=0; i<listaRecetas.length; i++) {   
        if (listaRecetas[i].getName().toLowerCase() === input.toLowerCase()){  
            var recFound = document.createElement("li")
            recFound.innerText=listaRecetas[i].getName()
            recFound.setAttribute('onclick', 'mostrarReceta('+i+')')            
            recFound.setAttribute('style', 'cursor:pointer')     //para que se vea que es un 'link'
            receta.appendChild(recFound)              
        } }
    
    //Añadimos la ul ingrediente a resultados sólo si contiene algún ingrediente
    if (ingrediente.hasChildNodes()){
        resultados.appendChild(titIngredientes)  
        resultados.appendChild(ingrediente)
    }

    //Añadimos la ul receta a resultados sólo si contiene alguna receta
    if (receta.hasChildNodes()){
        resultados.appendChild(titRecetas) 
        resultados.appendChild(receta)
    }

    //Si no hemos introducido receta ni ingrediente a resultados, significa que no hay ingredientes con el nombre buscado, así que se lo comunicamos al usuario
    if (!resultados.hasChildNodes()){
        noExisten = document.createElement('h3')
        noExisten.innerText = 'No hay ninguna receta ni ingrediente con ese nombre!'
        resultados.appendChild(noExisten)}
    content.appendChild(resultados)
}

////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////

//definimos una imagen por si no ponen ninguna
let undefinedLocation = 'fotos/undefined.jpeg'

//Inicializamos los valores ejemplo
let miel = new objIngrediente("Miel","dulce, pegajosa")
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
let c = new objReceta("Pollo con patatas al horno","Algo simple, para cuando vas corto de tiempo",[listaIngredientes[2].getName(),listaIngredientes[2].getName()], 'fotos/Pollo con patatas.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let d = new objReceta("Bistec con patatas","Recomendamos acompañarlo de alguna salsa sencillita",[listaIngredientes[4].getName(),listaIngredientes[2].getName()], 'fotos/bistec.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let listaRecetas = [a,b,c,d]


//Creamos un placeholder para poder volver al valor original si cancelan al modificar un paso
let placeholderString = ''

//Explicación de la línea 930
//Al hacer un formulario con un único input type text, al darle al intro hace submit, recargando la página.
//Esto es unn problema ya que cancela todo lo que haya hecho el usuario, y no permite que funcione la búsqueda.
//Para solucionarlo, hemos introducido un segundo input type text, que se mantendrá oculto. 
//Así, al haber dos, no hace submit al darle al intro, pues no sabe si todos los campos han sido rellenados