export let mapaIngredientes = new Map();

export class objIngrediente {

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

//Inicializamos los valores ejemplo
let miel = new objIngrediente("Miel","dulce, pegajosa")
let curry = new objIngrediente("Curry","to rico, ligeramente picante")
let pollo = new objIngrediente("Pollo","genérico. Incinera cualquier cosa que toque mientras esté crudo")
let avena = new objIngrediente("Avena","Excelente para desayunos")
let bistec = new objIngrediente("Bistec","De alta calidad, mejor dejar medio crudo")
let harina = new objIngrediente("Harina","Imprescindible para bollos y panes")
let leche = new objIngrediente("Leche","Universal bebida de desayuno")
let patatasFritas = new objIngrediente("Patatas Fritas","El mejor acompañante jamás creado")



mapaIngredientes.set('0', miel);
mapaIngredientes.set('1', curry);
mapaIngredientes.set('2', pollo);
mapaIngredientes.set('3', avena);
mapaIngredientes.set('4', bistec);
mapaIngredientes.set('5', harina);
mapaIngredientes.set('6', leche);
mapaIngredientes.set('7', patatasFritas);

export function nuevoIngrediente(){
    let ingrediente = new objIngrediente(nombre, descripcion)
    mapaIngredientes.set('mapaIngredientes.size', ingrediente)
}

export function borrarIngrediente(clave){
    mapaIngredientes.delete(clave)
}

export function modificarIngrediente(clave, cambios){
    let ingrediente = mapaIngredientes.get(clave)
    if (ingrediente.getName() != cambios.getName()){
        ingrediente.getName() = cambios.getName()    
    }
    if (ingrediente.getDescripcion() != cambios.getDescripcion()){
        ingrediente.getDescripcion() = cambios.getDescripcion()    
    }
    
}