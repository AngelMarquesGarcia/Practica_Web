
// para que se vean las recetas al cargar la pagina, debemos usar el operador $, que llame a pagRecetas

class objReceta {
    constructor(n, d, i,f){
        this.nombre=n
        this.descripcion=d
        this.ingredientes=i
        this.foto=f
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

    //añadir nombre
    let nombre = document.createElement("h2")
    nombre.innerText = listaRecetas[i].getName() 
    elemento.appendChild(nombre)
    
    //añadir descripcion
    let desc = document.createElement("p")
    desc.innerText = listaRecetas[i].getDescription()
    elemento.appendChild(desc)

    //Añadir ingredientes
    let ingredientes = document.createElement("ul")
    for (let ing of listaRecetas[i].ingredientes){
        console.log(ing)
        var ingrediente = document.createElement("li")
        ingrediente.innerText=ing
        ingredientes.appendChild(ingrediente)
    }
    elemento.appendChild(ingredientes)



    let goBackButton = document.createElement("button")
    goBackButton.setAttribute("type",  "button")
    goBackButton.setAttribute("onclick",  "pagRecetas()")
    goBackButton.innerText = 'Volver'
    content.appendChild(elemento)
    content.appendChild(goBackButton)


    

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
        nameLabel.setAttribute('for', 'name')  
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
        descLabel.setAttribute('for', 'desc')  
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
        let foto = document.createElement("input")           //CAMPO DE LA DESCRIPCION
        foto.setAttribute('type', 'file')                    //Type
        foto.setAttribute('id', 'fotoInput')                 //Id
        foto.setAttribute('accept', 'image/png, image/jpeg') //accept
        //FOTO


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

function crearReceta(){
    let nombre = document.getElementById('rName').value
    let descripcion = document.getElementById('rDesc').value
    let foto = document.getElementById('fotoInput')
    let ingredientes = []

    foto = undefinedLocation //////////////////////////////CAMBIAR ESTO CUANDO DESCUBRAMOS COMO UTILIZAR IMAGENES SUBIDAS POR EL USUARIO

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


    if (nombre==='' || descripcion==='' ){
        alert('Ambos campos deben estar rellenos')
    } else if (ingredientes.length==0){alert('La receta debe tener al menos un ingrediente')
    } else {
        let receta = new objReceta(nombre,descripcion, ingredientes, foto)
        listaRecetas[listaRecetas.length] = receta
    }

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

        formulario.appendChild(submitButton)
        content.appendChild(formulario)

       }

    }

    function busqueda(){
        let input = document.getElementById("busq").value;
        let ingrediente = document.createElement("ul")
        let receta = document.createElement("ul")
        for (i=0; i<listaIngredientes.length; i++) {  
            if (listaIngredientes[i].getName() === input){
                    var ingFound = document.createElement("li")
                    ingFound.innerText=listaIngredientes[i].getName()
                    recFound.setAttribute('onclick', 'mostrarReceta('+i+')')
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
        content.appendChild(ingrediente)
        content.appendChild(receta)
    }
}
    
    
    
    
    




////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////INICIALIZACION DE VARIABLES////////////////////////////////////////////////////////////////
let undefinedLocation = 'C:/Users/burak/OneDrive - Universidad Rey Juan Carlos/Curso 2/Web/_Practica/Practica_Web/fotos/undefined.jpeg'

let miel = new objIngrediente("miel","dulce, pegajosa")
let curry = new objIngrediente("Curry","to rico, ligeramente picante")
let pollo = new objIngrediente("Pollo","genérico. Incinera cualquier cosa que toque mientras esté crudo")
let avena = new objIngrediente("Avena","Excelente para desayunos")
let bistec = new objIngrediente("Bistec","De alta calidad, mejor dejar medio crudo")
let harina = new objIngrediente("Harina","Imprescindible para bollos y panes")
let leche = new objIngrediente("Leche","Universal bebida de desayuno")
let patatasFritas = new objIngrediente("Patatas Fritas","El mejor acompañante jamás creado")

let listaIngredientes = [miel, curry, pollo, avena, bistec, harina, leche, patatasFritas]


let a = new objReceta("Pollo al Curry","Pollo con curry, suele ir acompañado de arroz",[listaIngredientes[1].getName(),listaIngredientes[2].getName()], 'C:/Users/burak/OneDrive - Universidad Rey Juan Carlos/Curso 2/Web/_Practica/Practica_Web/fotos/pollo al curry.jpg')
let b = new objReceta("Desayuno de Avena","Avena con leche y miel, llena más de lo que esperarías. Sientete libre de acompañarlo con frutas de cualquier tipo",[listaIngredientes[3].getName(),listaIngredientes[6].getName(), listaIngredientes[0].getName()], 'C:/Users/burak/OneDrive - Universidad Rey Juan Carlos/Curso 2/Web/_Practica/Practica_Web/fotos/avena.png')
let c = new objReceta("Pollo con patatas al horno","Algo simple, para cuando vas corto de tiempo",[listaIngredientes[2].getName(),listaIngredientes[2].getName(7)], 'C:/Users/burak/OneDrive - Universidad Rey Juan Carlos/Curso 2/Web/_Practica/Practica_Web/fotos/Pollo con patatas.jpg')
let d = new objReceta("Bistec con patatas","Recomendamos acompañarlo de alguna salsa sencillita",[listaIngredientes[4].getName(),listaIngredientes[2].getName(7)], 'C:/Users/burak/OneDrive - Universidad Rey Juan Carlos/Curso 2/Web/_Practica/Practica_Web/fotos/bistec.jpg')
let listaRecetas = [a,b,c,d]








