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

