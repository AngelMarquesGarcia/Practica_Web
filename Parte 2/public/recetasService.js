//nombre:       string
//descripcion:  string
//ingredientes: array of integer 
//foto:         string
//pasos:        array of string 
class objReceta {
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
        for (pair of valor){
            if (this.pasos.get(pair[0]) != pair[1]){
                this.pasos.set(pair[0],pair[1])
            }
        }
    }
}

let a = new objReceta("Pollo al Curry","Pollo con curry, suele ir acompañado de arroz",[1,2], 'fotos/pollo al curry.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let b = new objReceta("Desayuno de Avena","Avena con leche y miel, llena más de lo que esperarías. Sientete libre de acompañarlo con frutas de cualquier tipo",[3,6,0], 'fotos/avena.png', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let c = new objReceta("Pollo con patatas al horno","Algo simple, para cuando vas corto de tiempo",[2,7], 'fotos/Pollo con patatas.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])
let d = new objReceta("Bistec con patatas","Recomendamos acompañarlo de alguna salsa sencillita",[4,7], 'fotos/bistec.jpg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])

let e = new objReceta("Bistec con comida","Recomendamos acompañarlo de alguna salsa sencillita",[4,7], 'fotos/undefined.jpeg', ['Paso 1', 'Paso 2', 'Paso 3', '...', 'Paso n'])

export let mapaRecetas = new Map

let key = 0

export function nuevaReceta(valor){
    mapaRecetas.set(key, valor)
    key++
}

export function borrarReceta(clave){
    mapaRecetas.delete(clave)
}

export function modificarReceta(clave, cambios){
    let receta = mapaRecetas.get(clave) 

    //actualizamos el nombre si es necesario
    if (receta.getName != cambios.getName){
        receta.setName(cambios.getName)
    }

    //actualizamos la descripcion si es necesario
    if (receta.getDescription != cambios.getDescription){
        receta.setDescription(cambios.getDescription)
    }

    //actualizamos los ingredientes si es necesario
    if (receta.getIngredientes != cambios.getIngredientes){
        receta.setIngredientes(cambios.getIngredientes)
    }

    //actualizamos la foto si es necesario
    if (receta.getFoto != cambios.getFoto){
        receta.setFoto(cambios.getFoto)
    }

    //actualizamos los pasos si es necesario
    if (receta.getPasos != cambios.getPasos){
        receta.setPasos(cambios.getPasos)
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
