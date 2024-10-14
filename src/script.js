const formulario = document.getElementById("formulario")
console.log(formulario)

const enviarFormulario = (event) => {
    event.preventDefault()

    const datosFormulario = new FormData(event.target)

    const datosPost = {
        "frecuencia": datosFormulario.get("txtFrecuencia"),
        "potencia": datosFormulario.get("txtPotencia"),
        "altura": datosFormulario.get("txtAltura"),
    }

    console.log(datosPost)

    fetch("http://127.0.0.1:8000/datos", {
        method: "POST",
        body: JSON.stringify(datosPost),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(datosDevueltos => {
        console.log(datosDevueltos)

        const mostrarZonaExc = document.getElementById("zonaExclusion")
        mostrarZonaExc.innerText = datosDevueltos.zona_exclusion
        const mostrarZonaOcu = document.getElementById("zonaOcupacional")
        mostrarZonaOcu.innerText = datosDevueltos.zona_ocupacion
        const mostrarZonaPob = document.getElementById("zonaPoblacional")
        mostrarZonaPob.innerText = datosDevueltos.zona_poblacion
    })
}

formulario.addEventListener('submit', enviarFormulario)

/*{
    "txtSenal": "1415",
    "txtFrecuencia": "154",
    "txtPotencia": "245",
    "txtAltura": "789"
}*/