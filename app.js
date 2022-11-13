
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
    setActiveNavTab('crearReceta')

    let content = document.getElementById('content');
    content.innerHTML = 'Crear Receta' 
}


function pagCrearIngrediente() {
    setActiveNavTab('crearIngrediente')

    let content = document.getElementById('content');
    content.innerHTML = 'Crear Ingrediente' 
}


function pagBuscar() {
    setActiveNavTab('buscar')

    let content = document.getElementById('content');
    content.innerHTML = 'Buscar' 
}

let miel = new objIngrediente("miel","dulce, pegajosa")
let curry = new objIngrediente("Curry","to rico, ligeramente picante")
let pollo = new objIngrediente("Pollo","genérico. Incinera cualquier cosa que toque mientras esté crudo")
let avena = new objIngrediente("Avena","Excelente para desayunos")
let pollas = new objIngrediente("Pollas","La comida preferida de Daniel")
let listaIngredientes = [miel, curry, pollo, avena, pollas, pollas]


let a = new objReceta("a","a",listaIngredientes[0])
let b = new objReceta("b","b",listaIngredientes[1])
let c = new objReceta("c","c",listaIngredientes[2])
let d = new objReceta("d","d",listaIngredientes[3])
let listaRecetas = [a,b,c,d]








