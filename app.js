
// para que se vean las recetas al cargar la pagina, debemos usar el operador $, que llame a pagRecetas

class objReceta {
    constructor(n, d, i){
        this.nombre=n
        this.descripcion=d
        this.ingredientes=i
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
    
    let content = document.getElementById(targetTab) //makes current tab active
    content.setAttribute("class",  "active")
}

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
        let nombre = document.createElement("h2")
        nombre.innerText = listaRecetas[i].getName() 
        elemento.appendChild(nombre)
        let desc = document.createElement("p")
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
        nameInput.setAttribute('type', 'text')  
        nameInput.setAttribute('class', 'form-control')
        nameInput.setAttribute('id', 'name')
        nameInput.setAttribute('placeholder', 'Un nombre bonito')

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
        descInput.setAttribute('type', 'text')  
        descInput.setAttribute('class', 'form-control')
        descInput.setAttribute('id', 'desc')
        descInput.setAttribute('placeholder', 'Una descripción detallada')

        descGroup.appendChild(descLabel)
        descGroup.appendChild(descInput)
        formulario.appendChild(descGroup)
        //DESCRIPCION

        let ingGroup = document.createElement("div")
        ingGroup.setAttribute('class', 'form-group') 

        for (let i=0;i<listaIngredientes.length;i++){
            var ingLabel = document.createElement("label")
            ingLabel.setAttribute('for', 'ing'+i)  
            ingLabel.innerText = listaIngredientes[i].getName() 
            var ingInput = document.createElement("input")
            ingInput.setAttribute('type', 'checkbox')  
            ingInput.setAttribute('id', 'ing'+i)  
            ingInput.setAttribute('value', i)  

            ingGroup.appendChild(ingLabel)
            ingGroup.appendChild(ingInput)

        }



        formulario.appendChild(ingGroup)
        
        content.appendChild(formulario)
        



    }
}


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
        nameInput.setAttribute('id', 'name')
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
        descInput.setAttribute('id', 'desc')
        descInput.setAttribute('placeholder', 'Una descripción detallada')

        //Hacemos que el campo de descripción pertenezca a el formulario
        descGroup.appendChild(descLabel)
        descGroup.appendChild(descInput)
        formulario.appendChild(descGroup)
        
        //Metemos el formulario en el HTML
        content.appendChild(formulario)

    }
}


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
        
        //Metemos el formulario en el HTML
        content.appendChild(formulario)




















    }
}

let miel = new objIngrediente("miel","dulce, pegajosa")
let curry = new objIngrediente("Curry","to rico, ligeramente picante")
let pollo = new objIngrediente("Pollo","genérico. Incinera cualquier cosa que toque mientras esté crudo")
let avena = new objIngrediente("Avena","Excelente para desayunos")
let pollas = new objIngrediente("Pollas","La comida preferida de Daniel")
let listaIngredientes = [miel, curry, pollo, avena, pollas, pollas, miel, pollo, avena]


let a = new objReceta("a","a",listaIngredientes[0])
let b = new objReceta("b","b",listaIngredientes[1])
let c = new objReceta("c","c",listaIngredientes[2])
let d = new objReceta("d","d",listaIngredientes[3])
let listaRecetas = [a,b,c,d]








