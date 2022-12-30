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
        //for (let pair of valor){
        //    if (this.pasos[pair[0]] != pair[1]){
        //        this.pasos[pair[0]] = pair[1]
        //    }
        //}
    }
}

let a = new objReceta("Pollo al Curry","Pollo con curry, suele ir acompañado de arroz",[1,2], 'fotos/pollo al curry.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let b = new objReceta("Desayuno de Avena","Avena con leche y miel, llena más de lo que esperarías. Sientete libre de acompañarlo con frutas de cualquier tipo",[3,6,0], 'fotos/avena.png', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let c = new objReceta("Pollo con patatas al horno","Algo simple, para cuando vas corto de tiempo",[2,7], 'fotos/Pollo con patatas.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let d = new objReceta("Bistec con patatas","Recomendamos acompañarlo de alguna salsa sencillita",[4,7], 'fotos/bistec.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])

let e = new objReceta("Bistec con comida","Recomendamos acompañarlo de alguna salsa sencillita",[4,7], 'fotos/undefined.jpeg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])

export let mapaRecetas = new Map

let contador = 0

nuevaReceta(a)
nuevaReceta(b)
nuevaReceta(c)
nuevaReceta(d)
nuevaReceta(e)


export function nuevaReceta(valor){
    mapaRecetas.set(contador.toString(), valor)
    contador++
}

export function borrarReceta(clave){
    mapaRecetas.delete(clave)
}

export function modificarReceta(clave, cambios){
    let receta = mapaRecetas.get(clave) 

    //actualizamos el nombre si es necesario
    if (receta.getName() != cambios.nombre){
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
    //let values = [...mapaRecetas.values()];
    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
}




`
nuevaReceta('hola')
nuevaReceta('adios')
nuevaReceta('mundo')

borrarReceta(1)

for (pair of mapaRecetas){
    console.log(pair)
}
`
