
let undefinedLocation = 'fotos/undefined.jpeg'

const RecetasMostradas = 5;
const CargarRecetas = 0;

async function masRecetas(){

    const from = (CargarRecetas+1) * RecetasMostradas;
    const to = from + RecetasMostradas;

    const response = await fetch(`/public/recetasService?from=${from}&to=${to}`)
    
    const nuevasRecetas = await response.json()

    const recetasDiv = document.getElementById("receta")

    recetasDiv.innerHTML += nuevasRecetas

CargarRecetas++
}



function borrarIngrediente(i){    

    if (confirm('¿Seguro que quieres borrar este ingrediente?')){
        window.location.href = `/ingredientes/borrar/${i}`
    }
}

function modificarIngrediente(i){
    window.location.href = `/ingredientes/modificar/${i}`
}

function borrarReceta(i){    
    if (confirm('¿Seguro que quieres borrar esta receta?')){
        window.location.href = `/recetas/borrar/${i}`
    }
}

function modificarReceta(i){
    window.location.href = `/recetas/modificar/${i}`
}


function guardarRecetaEnMapa(i,receta){
    if (i!=''){
        i = i.slice(1,2)
        window.location.href = `/receta/guardar/${i}?receta=${JSON.stringify(receta)}`
    } else {
        window.location.href = `/receta/guardar?receta=${JSON.stringify(receta)}`
    }
}

//Funciones de main
//Funciones de main

function guardarReceta(i, ingredientSize){
    //cojemos los valores del formulario
    let nombre = document.getElementById('rName').value
    let descripcion = document.getElementById('rDesc').value
    let foto = document.getElementById('rFoto').value
    let pasos = []
    let ingredientes = []
    
    //si no han metido nada en el campo de la foto, ponemos una predefinida
    if (foto === '' || foto === undefined){
        foto = undefinedLocation 
    }

    //Si hay otra receta con el mismo nombre, avisamos
    //for (rec of listaRecetas){
    //    if (rec.getName()===nombre) {
    //        if (!confirm('Ya existe una receta con ese nombre, ¿seguro que quieres crear otra?')){
    //            return}
    //    }
    //}

    //Guardamos los ingredientes marcados (los ingredientes son una checkbox)
    //Para ello, iteramos por las checkboxes, y, si está checkeada, guardamos el valor en la posición n, y sumamos uno a n
    let n=0
    for (let ingIndex=0;ingIndex<ingredientSize;ingIndex++){
        var ingrediente = document.getElementById('ing'+ingIndex)
        if (ingrediente.checked){
            ingredientes[n] = ingrediente.value
            n++
        }
    }

    //Iteramos por los pasos que haya añadido el usuario, guardando su valor en la lista (los pasos son li dentro de una ol)
    let pasosArray = document.getElementById('pasosList').children
    if (pasosArray.length === 0 || pasosArray.length === undefined) {alert('La receta debe tener al menos un paso'); return} //Si no hay pasos, cancelamos el guardado
    for (let ind = 0; ind<pasosArray.length;ind++){
        pasos[ind] = pasosArray.item(ind).firstChild.wholeText
    }

    resetPasos() //borra los pasos y resetea el input

    //Comprobamos que haya metido nombre, descripción, e ingredientes, y, si los ha metido, guardamos los valores
    if (nombre==='' || descripcion==='' ){
        alert('Debe haber tanto nombre como descripción')
    } else if (ingredientes.length==0){alert('La receta debe tener al menos un ingrediente')
    } else {
        let receta = {nombre:nombre,descripcion:descripcion, ingredientes:ingredientes, foto:foto, pasos:pasos}
        guardarRecetaEnMapa(i,receta)
    }
}
//////////////////////// PASOS ////////////////////////
//////////////////////// PASOS ////////////////////////

//Toma el valor del input (o del parámetro valor), y añade un li a la ol con ese valor, y botones para modificarlo y borrarlo
//Además, cambia el input, su label, y su botón, para aumentar el paso en el que están. i es el índice del paso en el que estamos (0 indexed)
function crearPaso(i,valor){
    
    let inpPasos = document.getElementById('rPasos')
    if (valor === undefined && inpPasos.value === ''){alert('El paso a introducir no puede ser vacío');return} 

    incrementarPaso() //actualiza el input, label, y botón

    //añadir el paso i a la ordered list
    let listaPasos = document.getElementById('pasosList')
    let pasoI = document.createElement('li')
    pasoI.setAttribute('id','idPaso'+i)
    if (valor===undefined){
        pasoI.innerText = inpPasos.value 
    } else {pasoI.innerText = valor}
    
    //Crear boton de borrar paso
    let btnBorrarPasoI = document.createElement('button')
    btnBorrarPasoI.setAttribute('onclick','borrarPaso('+i+')')
    btnBorrarPasoI.setAttribute('type','button')
    btnBorrarPasoI.setAttribute('class', 'btn btn-default')  
    btnBorrarPasoI.innerText = 'Borrar paso '+ (i+1) 

    //Crear boton de modificar paso
    let btnModificarPasoI = document.createElement('button')
    btnModificarPasoI.setAttribute('onclick','modificarPaso('+i+')')
    btnModificarPasoI.setAttribute('type','button')
    btnModificarPasoI.setAttribute('class', 'btn btn-default')  
    btnModificarPasoI.innerText = 'Modificar paso '+ (i+1)

    //añadir botones al paso, y el paso a la lista
    pasoI.appendChild(btnBorrarPasoI)
    pasoI.appendChild(btnModificarPasoI)
    listaPasos.appendChild(pasoI)

    inpPasos.value='' //reseteamos el valor del input
}

//borra el paso con índice i de la ol
function borrarPaso(i) {
    if (!confirm('Seguro que quieres eliminar este paso?')){return}
    let listaPasos = document.getElementById('pasosList')
    listaPasos.removeChild(listaPasos.children.item(i))
    incrementarPaso(i) //como hemos borrado un paso, hay que actualizar el formulario, restándole uno
}

//Actualiza los campos del formulario para que muestren el paso adecuado. Para añadir pasos, i se deja undefined.
//Si pasamos i es porque estamos borrando un paso.
function incrementarPaso(i){
    let pasosActualizar = document.getElementById('pasosList').children //Hijos de la ol; los li
    let siguientePaso = pasosActualizar.length + 1
    if (siguientePaso===undefined){siguientePaso=1}
    if (i===undefined){siguientePaso++} //hace falta sumarle 2 porque al crear un paso actualizamos antes de meter el paso nuevo

    //cambiar label
    let pLabel = document.getElementById('pasosLabel')
    pLabel.innerText = 'Introduce el paso '+(siguientePaso)+' de la receta'

    //cambiar button
    let pBtn = document.getElementById('pasosBtn')
    pBtn.innerText = 'Enviar paso '+(siguientePaso)
    pBtn.setAttribute('onclick', 'crearPaso('+(siguientePaso-1)+')') //es siguientePaso-1 porque queremos que sea el index

    //Modificar <input>
    let inpPasos = document.getElementById('rPasos')
    inpPasos.setAttribute('placeholder','Paso '+ (siguientePaso))

    //Si han pasado una i -> Estamos eliminando -> debemos actualizar los botones porque su indice ha cambiado
    //Iteramos por todos los pasos, y en cada paso le cambiamos a los botones la id, onclick, y contenido para que coincida con su posición
    if (i!=undefined){
        for (let n=0;n<pasosActualizar.length;n++){ 
            var li = pasosActualizar.item(n)
            li.setAttribute('id', 'idPaso'+n)
            li.firstElementChild.setAttribute('onclick','borrarPaso('+n+')')
            li.firstElementChild.innerText = 'Borar paso ' + (n+1)
            li.children.item(1).setAttribute('onclick','modificarPaso('+n+')')
            li.children.item(1).innerText = 'Modificar paso ' + (n+1)
        }
    }
}

//Al darle al boton de modificar un paso, borramos el li, y lo sustituimos por un input con sus botones de enviar y cancelar
function modificarPaso(i){
    let listaPasos = document.getElementById('pasosList')
    let paso = listaPasos.children.item(i)

    //Input contenido
    let inpPaso = document.createElement('input')
    inpPaso.setAttribute('type','text')
    inpPaso.setAttribute('id','inpPasos')
    inpPaso.setAttribute('value',paso.firstChild.wholeText)

    //Botón Enviar
    let inpBtnEnviar = document.createElement('button')
    inpBtnEnviar.setAttribute('id','inpBtnEnviar')
    inpBtnEnviar.setAttribute('type','button')
    inpBtnEnviar.setAttribute('onclick','sendModifiedPaso('+i+',1)')
    inpBtnEnviar.innerText = 'Guardar cambios'

    //Botón Cancelar
    let inpBtnCancelar = document.createElement('button')
    inpBtnCancelar.setAttribute('type','button')
    inpBtnCancelar.setAttribute('id','inpBtnCancelar')
    inpBtnCancelar.setAttribute('onclick','sendModifiedPaso('+i+',0)')
    inpBtnCancelar.innerText = 'Cancelar'

    //Usamos insertBefore para mantener el orden
    listaPasos.insertBefore(inpPaso,paso)
    listaPasos.insertBefore(inpBtnEnviar,paso)
    listaPasos.insertBefore(inpBtnCancelar,paso)

    placeholderString = paso.firstChild.wholeText //guardamos el contenido del paso en una variable global por si quiere cancelar

    listaPasos.removeChild(paso)
}

//Es la función que se llama cuando le das a cualquier botón al modificar paso.
//Crea un li, le mete el valor original si cancelas, o lo que ponga en el input si envías, y llama a borrarFormPaso()
// i es el índice del paso que estamos modificando.
// send toma valores de 0 o 1, donde 0 es cancelar y 1 guardar
function sendModifiedPaso(i,send){
    let listaPasos = document.getElementById('pasosList')
    let pasoI = document.createElement('li')
    let valor = 'Error al modificar' //Inicializamos valor en el bloque de la función para poder utilizarlo más adelante

    if (send===1){valor = document.getElementById('inpPasos').value}
    else {valor = placeholderString}

    pasoI.setAttribute('id','idPaso'+i) 
    pasoI.innerText = valor

    //crear boton de borrar
    let btnBorrarPasoI = document.createElement('button')
    btnBorrarPasoI.setAttribute('onclick','borrarPaso('+i+')')
    btnBorrarPasoI.setAttribute('type','button')
    btnBorrarPasoI.setAttribute('class', 'btn btn-default')  
    btnBorrarPasoI.innerText = 'Borrar paso '+ (i+1)

    //crear boton de modificar
    let btnModificarPasoI = document.createElement('button')
    btnModificarPasoI.setAttribute('onclick','modificarPaso('+i+')')
    btnModificarPasoI.setAttribute('type','button')
    btnModificarPasoI.setAttribute('class', 'btn btn-default')  
    btnModificarPasoI.innerText = 'Modificar paso '+ (i+1)

    pasoI.appendChild(btnBorrarPasoI)
    pasoI.appendChild(btnModificarPasoI)
    listaPasos.insertBefore(pasoI,document.getElementById('inpPasos'))

    borrarFormPaso() //borramos el formulario
}

//Borra el formulario que se crea para modificar los pasos
function borrarFormPaso(){
    let listaPasos = document.getElementById('pasosList')
    listaPasos.removeChild(document.getElementById('inpPasos'))
    listaPasos.removeChild(document.getElementById('inpBtnEnviar'))
    listaPasos.removeChild(document.getElementById('inpBtnCancelar'))
}

//Vacía la ol De los pasos, y reinicia el valor del formulario (para que vuelva a decir paso 1)
function resetPasos(){
    let listaPasos = document.getElementById('pasosList')
    listaPasos.innerHTML = ''

    incrementarPaso(0)
}
//////////////////////// PASOS ////////////////////////
//////////////////////// PASOS ////////////////////////