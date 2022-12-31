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

    setName(valor){
        this.nombre=valor
    }
    
    setDescripcion(valor){
        this.descripcion=valor
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


let c = 0

nuevoIngrediente(miel)
nuevoIngrediente(curry)
nuevoIngrediente(pollo)
nuevoIngrediente(avena)
nuevoIngrediente(bistec)
nuevoIngrediente(harina)
nuevoIngrediente(leche)
nuevoIngrediente(patatasFritas)

export function nuevoIngrediente(valor){
    mapaIngredientes.set(c.toString(), valor)
    c++
}

export function borrarIngrediente(clave){
    mapaIngredientes.delete(clave)
}

export function modificarIngrediente(clave, cambios){
    //No borra el objeto original, cambia sus campos para que coincidan con el objeto nuevo

    let ingrediente = mapaIngredientes.get(clave)
    if (ingrediente.getName() != cambios.getName()){
        ingrediente.setName(cambios.getName())    
    }
    if (ingrediente.getDescripcion() != cambios.getDescripcion()){
        ingrediente.setDescripcion(cambios.getDescripcion())    
    }
    
}