
// para que se vean las recetas al cargar la pagina, debemos usar el operador $, que llame a pagRecetas

function pagRecetas() {
    let content = document.getElementById('content');
    
    var nCompleteRows = listaRecetas.length() / 3
    if (nCompleteRows <= 1 ) {
        $(grid).css({grid-template-rows: [y0] 1fr [y1] 1fr [y2] 1fr [y3];})

    }
    content.innerHTML = <div id=""> </div>
}


function pagIngredientes() {
    let content = document.getElementById('content');
    content.innerHTML = 'Ingredientes' 
}

function pagCrearReceta() {
    let content = document.getElementById('content');
    content.innerHTML = 'Crear Receta' 
}


function pagCrearIngrediente() {
    let content = document.getElementById('content');
    content.innerHTML = 'Crear Ingrediente' 
}


function pagBuscar() {
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
    getDescripcion(){
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













