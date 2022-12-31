//nombre:       string
//descripcion:  string
//ingredientes: array of integer 
//foto:         string
//pasos:        array of string 
export class objReceta {
    constructor(n, d, i, f, p){
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

    setName(valor){
        this.nombre = valor
    }
    setDescription(valor){
        this.descripcion = valor
    }
    setIngredientes(valor){
        this.ingredientes = valor
    }
    setFoto(valor){
        this.foto = valor
    }
    setPasos(valor){

        this.pasos = valor.slice(0,valor.length)
    }
}

let r0 = new objReceta("Pollo al Curry","Pollo con curry, suele ir acompañado de arroz",[1,2], 'fotos/pollo al curry.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r1 = new objReceta("Desayuno de Avena","Avena con leche y miel, llena más de lo que esperarías. Sientete libre de acompañarlo con frutas de cualquier tipo",[3,6,0], 'fotos/avena.png', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r2 = new objReceta("Pollo con patatas al horno","Algo simple, para cuando vas corto de tiempo",[2,7], 'fotos/Pollo con patatas.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r3 = new objReceta("Bistec con patatas","Recomendamos acompañarlo de alguna salsa sencillita",[4,7], 'fotos/bistec.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r4 = new objReceta("Bistec con comida","Recomendamos acompañarlo de alguna salsa sencillita",[4,7], 'fotos/undefined.jpeg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r5 = new objReceta("R5","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[2,6], 'fotos/r5.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r6 = new objReceta("R6","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[7,3], 'fotos/r6.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r7 = new objReceta("R7","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[1,4], 'fotos/r7.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r8 = new objReceta("R8","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[5,3], 'fotos/r8.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r9 = new objReceta("R9","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[3,2], 'fotos/r9.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r10 = new objReceta("R10","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[5,6], 'fotos/r10.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r11 = new objReceta("R11","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[5,3], 'fotos/r11.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r12 = new objReceta("R12","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[2,1], 'fotos/r12.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r13 = new objReceta("R13","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[7,2], 'fotos/r13.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r14 = new objReceta("R14","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[1,6], 'fotos/r14.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r15 = new objReceta("R15","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[4,6], 'fotos/r15.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r16 = new objReceta("R16","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[3,4], 'fotos/r16.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r17 = new objReceta("R17","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[3,5], 'fotos/r17.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r18 = new objReceta("R18","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[4,1], 'fotos/r18.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r19 = new objReceta("R19","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[2,6], 'fotos/r19.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let r20 = new objReceta("R20","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",[7,6], 'fotos/r20.jfif', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])

export let mapaRecetas = new Map

let contador = 0

nuevaReceta(r0)
nuevaReceta(r1)
nuevaReceta(r2)
nuevaReceta(r3)
nuevaReceta(r4)
nuevaReceta(r5)
nuevaReceta(r6)
nuevaReceta(r7)
nuevaReceta(r8)
nuevaReceta(r9)
nuevaReceta(r10)
nuevaReceta(r11)
nuevaReceta(r12)
nuevaReceta(r13)
nuevaReceta(r14)
nuevaReceta(r15)
nuevaReceta(r16)
nuevaReceta(r17)
nuevaReceta(r18)
nuevaReceta(r19)
nuevaReceta(r20)


export function nuevaReceta(valor){
    let receta = new objReceta(valor.nombre, valor.descripcion, valor.ingredientes, valor.foto, valor.pasos)
    mapaRecetas.set(contador.toString(), receta)
    contador++
}

export function borrarReceta(clave){
    mapaRecetas.delete(clave)
}

export function modificarReceta(clave, cambios){
    let receta = mapaRecetas.get(clave) 
    
    //actualizamos el nombre si es necesario
    if (receta.getName != cambios.nombre){
        receta.setName(cambios.nombre)
    }

    //actualizamos la descripcion si es necesario
    if (receta.getDescription() != cambios.descripcion){
        receta.setDescription(cambios.descripcion)
    }

    //actualizamos los ingredientes si es necesario
    if (receta.getIngredientes() != cambios.ingredientes){
        receta.setIngredientes(cambios.ingredientes)
    }

    //actualizamos la foto si es necesario
    if (receta.getFoto() != cambios.foto){
        receta.setFoto(cambios.foto)
    }

    //actualizamos los pasos si es necesario
    if (receta.getPasos() != cambios.pasos){
        receta.setPasos(cambios.pasos)
    }
}

export function devolverReceta(key) {
    return mapaRecetas.get(key);
}

export function devolverRecetas(from, to) {
    let values = []
    for (let pair of mapaRecetas){
        values.push({indice:pair[0],receta:pair[1]})
    }

    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
}
