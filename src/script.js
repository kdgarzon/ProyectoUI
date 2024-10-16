const enviarFormulario = async (event) => {
    event.preventDefault();

    const datosFormulario = new FormData(event.target);

    const datosPost = {
        "frecuencia": datosFormulario.get("txtFrecuencia"),
        "potencia": datosFormulario.get("txtPotencia"),
        "altura": datosFormulario.get("txtAltura"),
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/datos", {
            method: "POST",
            body: JSON.stringify(datosPost),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            const datosDevueltos = await response.json();

            const antennaInfo = document.getElementById("antennaInfo");
            antennaInfo.innerHTML = `
                <img alt="antena" src="src/img/ic_antena.svg" id="icono-antena" class="img-fluid" />
                Frecuencia: ${datosPost.frecuencia} MHz, Potencia: ${datosPost.potencia} W, Altura: ${datosPost.altura} m
            `;

            const zonas = [
                {
                    id: "zonaExclusion",
                    text: `La <span class="bold">Zona de Exclusión</span> está ubicada en un radio de <span class="bold">${datosDevueltos.zona_exclusion.toFixed(2)} metros</span> desde la base de la antena. En esta zona, está prohibido el acceso debido a los niveles elevados de radiación. Ninguna actividad se permite en este rango.`
                },
                {
                    id: "zonaOcupacional",
                    text: `La <span class="bold">Zona Ocupacional</span>, también conocida como zona de acceso restringido, se extiende desde el final de la Zona de Exclusión hasta un radio de <span class="bold">${datosDevueltos.zona_ocupacion.toFixed(2)} metros</span>. Solo el personal autorizado puede ingresar a esta área, debido a los niveles controlados de radiación.`
                },
                {
                    id: "zonaPoblacional",
                    text: `La <span class="bold">Zona Poblacional</span> comienza desde el final de la Zona Ocupacional y se extiende hasta un radio de <span class="bold">${datosDevueltos.zona_poblacion.toFixed(2)} metros</span>.`
                }
            ];


            zonas.forEach(zona => {
                const zonaDiv = document.getElementById(zona.id);
                zonaDiv.style.display = "flex";
                document.getElementById(`${zona.id}Text`).innerHTML = zona.text;
            });

        } else {
            console.error(`Error: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
};

formulario.addEventListener('submit', enviarFormulario);
