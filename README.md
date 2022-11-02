# Practica_Web  
el * indica que es opcional

Vamos a hacer un recetario.

Elemento: receta
    -título
    -descripción
Subelemento: ingredientes
    -nombre
    -descripcion*
    -foto*

Subelemento: pasos/instrucciones
    -lista/cuadro de texto

###################### Pagina principal ######################
        Tu recetario to bonico
    {elemento 1 [mas info]
    elemento 2  [mas info]
    ...
    elemento n} ó {sin elementos}
    [nuevo elemento]
###################### Pagina ver elemento ######################
        Elemento 1 (seria el titulo)
    descripcion
    Ingredientes
    pasos
    
    [volver]
    [borrar] (preguntar, ¿seguro?)
    [modificar]
###################### Pagina mod elemento ######################
        Modificar Elemento 1
    Titulo: "elemento 1:
    Descripción: "elemento 1, ta mu rico"
    Foto*: imagen.jpg
    Lista de ingredientes:
        - Ingrediente 1 [borrar]
        - Ingrediente 2 [borrar]
        - ...
        - Ingrediente n [borrar]
        - Nuevo elemento

a