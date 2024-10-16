const calcularZonaExclusion = (frecuencia, potencia, altura) => {
    return calcularZonaOcupacion(frecuencia, potencia, altura) / 2;
};

const calcularZonaOcupacion = (frecuencia, potencia, altura) => {
    let r = 0;
    if (frecuencia >= 1 && frecuencia < 10) {
        r = 0.0144 * frecuencia * Math.sqrt(potencia);
    } else if (frecuencia >= 10 && frecuencia < 400) {
        r = 0.143 * Math.sqrt(potencia);
    } else if (frecuencia >= 400 && frecuencia < 2000) {
        r = 2.92 * Math.sqrt(potencia / frecuencia);
    } else if (frecuencia >= 2000 && frecuencia < 300000) {
        r = 0.0638 * Math.sqrt(potencia);
    }

    if (altura >= r) {
        return r;
    }

    return Math.sqrt((r ** 2) - (altura ** 2));
};

const calcularZonaPoblacion = (frecuencia, potencia, altura) => {
    let r = 0;
    if (frecuencia >= 1 && frecuencia < 10) {
        r = 0.10 * Math.sqrt(potencia * frecuencia);
    } else if (frecuencia >= 10 && frecuencia < 400) {
        r = 0.319 * Math.sqrt(potencia);
    } else if (frecuencia >= 400 && frecuencia < 2000) {
        r = 6.38 * Math.sqrt(potencia / frecuencia);
    } else if (frecuencia >= 2000 && frecuencia < 300000) {
        r = 0.143 * Math.sqrt(potencia);
    }

    if (altura >= r) {
        return r;
    }

    return Math.sqrt((r ** 2) - (altura ** 2));
};

const enviarFormulario = async (event) => {
    event.preventDefault();

    const datosFormulario = new FormData(event.target);
    const frecuencia = parseFloat(datosFormulario.get("txtFrecuencia"));
    const potencia = parseFloat(datosFormulario.get("txtPotencia"));
    const altura = parseFloat(datosFormulario.get("txtAltura"));

    document.getElementById("btnCalcular").disabled = true;
    document.getElementById("loading").style.display = "block";

    const zonaExclusion = calcularZonaExclusion(frecuencia, potencia, altura);
    const zonaOcupacion = calcularZonaOcupacion(frecuencia, potencia, altura);
    const zonaPoblacion = calcularZonaPoblacion(frecuencia, potencia, altura);

    const antennaInfo = document.getElementById("antennaInfo");
    antennaInfo.innerHTML = `
        <img alt="antena" src="src/img/ic_antena.svg" id="icono-antena" class="img-fluid" />
        Frecuencia: ${frecuencia} MHz, Potencia: ${potencia} W, Altura: ${altura} m
    `;

    const zonas = [
        {
            id: "zonaExclusion",
            text: `La <span class="bold">Zona de Exclusión</span> está ubicada en un radio de <span class="bold">${zonaExclusion.toFixed(2)} metros</span> desde la base de la antena. En esta zona, está prohibido el acceso debido a los niveles elevados de radiación. Ninguna actividad se permite en este rango.`
        },
        {
            id: "zonaOcupacional",
            text: `La <span class="bold">Zona Ocupacional</span>, también conocida como zona de acceso restringido, se extiende desde el final de la Zona de Exclusión hasta un radio de <span class="bold">${zonaOcupacion.toFixed(2)} metros</span>. Solo el personal autorizado puede ingresar a esta área, debido a los niveles controlados de radiación.`
        },
        {
            id: "zonaPoblacional",
            text: `La <span class="bold">Zona Poblacional</span> comienza desde el final de la Zona Ocupacional y se extiende hasta un radio de <span class="bold">${zonaPoblacion.toFixed(2)} metros</span>.`
        }
    ];

    zonas.forEach(zona => {
        const zonaDiv = document.getElementById(zona.id);
        zonaDiv.style.display = "flex";
        document.getElementById(`${zona.id}Text`).innerHTML = zona.text;
    });

    document.getElementById("loading").style.display = "none";
    document.getElementById("btnNuevaCalculo").style.display = "block";
};

const limpiarFormulario = () => {
    document.getElementById("formulario").reset();
    document.getElementById("btnCalcular").disabled = false;
    document.getElementById("btnNuevaCalculo").style.display = "none";
    const zonas = ["zonaExclusion", "zonaOcupacional", "zonaPoblacional"];
    zonas.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
};

document.getElementById("formulario").addEventListener('submit', enviarFormulario);
document.getElementById("btnLimpiar").addEventListener('click', limpiarFormulario);
