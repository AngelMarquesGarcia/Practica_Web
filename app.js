
// para que se vean las recetas al cargar la pagina, debemos usar el operador $, que llame a pagRecetas

function setActiveNavTab(tab){ //could be done better by giving current and previous tab, so that only the previous tab is accesed and disabled
    let tabs = ['recetas', 'ingredientes', 'crearReceta', 'crearIngrediente', 'buscar']
    
    
    for (let i = 0; i < tabs.length; i++){ //makes all tabs inactive
        let content = document.getElementById(tabs[i])
        content.setAttribute("class",  "inactive")
    } 
    
    let content = document.getElementById(tab) //makes current tab active
    content.setAttribute("class",  "active")
}

function pagRecetas(n) {

    //making the active nav-tab show properly
    setActiveNavTab('recetas')
    //making the active nav-tab show properly

    let content = document.getElementById('content')
    let a = document.createElement("div")

    var elementos = document.createElement("div")
    elementos.setAttribute("class",  "wrapper")
    for (let i = 0; i < n; i++){

        var elemento = document.createElement("div")
        elemento.setAttribute("class",  "receta")
        let nombre = document.createElement("h2")
        nombre.innerText = "nombre"//listaRecetas[i].getName()
        elemento.appendChild(nombre)
        let desc = document.createElement("p")
        desc.innerText = "descripcion"//listaRecetas[i].getDescription()
        elemento.appendChild(desc)
        elementos.appendChild(elemento)
    }

    
    
    content.appendChild(elementos)
        


    }


function pagIngredientes() {
    setActiveNavTab('ingredientes')

    let content = document.getElementById('content');
    let a = documet.createelement("div")
    
    var elementos = document.createElement("div")
    elementos.setAttribute("class", "container")
    for(let i = 0; i < n; i++){
        
        var elemento = document.createElement("div")
        let nombre = document.createElement("h3")
        nombre.innerText = "nombre"
        elemento.appendChild(nombre)
        let desc = document.createElement("p")
        desc.innerText = "descripcion"
        elemento.appendChild(desc)
        elementos.appendChild(elemento)
    }


    content.appendChild(elementos)


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


class objReceta {
    constructor(n, d, i){
        this.nombre=n
        this.descripcion=d
        this.ingredientes=i
        }

    getName(){
        return this.nombre
    }
    get Description(){
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

miel = objIngrediente.constructor("miel","dulce y pegajosa")
a = objReceta.constructor("a","a",miel)
b = objReceta.constructor("b","b",miel)
c = objReceta.constructor("c","c",miel)
d = objReceta.constructor("d","d",miel)


listaRecetas=[a,b,c,d]

miel = objIngrediente.constructor("miel","dulce y pegajosa")
a = objIngrediente.constructor("a","a")
b = objIngrediente.constructor("b","b")
c = objIngrediente.constructor("c","c")
d = objIngrediente.constructor("d","d")


listaIngredientes=[a,b,c,d]












