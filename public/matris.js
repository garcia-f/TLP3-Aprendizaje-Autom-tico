function crearMatriz() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);

    if (!filas || !columnas || filas <= 0 || columnas <= 0) {
        alert("Por favor ingrese números válidos");
        return;
    }

    let matrizDiv1 = document.createElement("div");
    matrizDiv1.classList.add("matriz");

    let matrizDiv2 = document.createElement("div");
    matrizDiv2.classList.add("matriz");

    for (let i = 0; i < filas; i++) {
        let filaDiv1 = document.createElement("div");
        filaDiv1.classList.add("fila");
        let filaDiv2 = document.createElement("div");
        filaDiv2.classList.add("fila");
        for (let j = 0; j < columnas; j++) {
            let input1 = document.createElement("input");
            input1.type = "number";
            input1.classList.add("elemento");
            let input2 = input1.cloneNode(true);
            filaDiv1.appendChild(input1);
            filaDiv2.appendChild(input2);
        }
        matrizDiv1.appendChild(filaDiv1);
        matrizDiv2.appendChild(filaDiv2);
    }

    // Agregar las matrices al DOM
    let contenedorMatriz1 = document.getElementById("matriz1");
    contenedorMatriz1.innerHTML = "";
    contenedorMatriz1.appendChild(matrizDiv1);

    let contenedorMatriz2 = document.getElementById("matriz2");
    contenedorMatriz2.innerHTML = "";
    contenedorMatriz2.appendChild(matrizDiv2);
}

// Función para enviar las matrices al servidor y mostrar el resultado
function enviarMatrices() {
    const matriz1 = obtenerMatriz("matriz1");
    const matriz2 = obtenerMatriz("matriz2");
    
    fetch('/sumar-matrices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(resultado => mostrarMatrizResultado(resultado))
    .catch(error => alert("Ocurrió un error al sumar las matrices"));
}

// Función para obtener las matrices del DOM
function obtenerMatriz(contenedorId) {
    const contenedorMatriz = document.getElementById(contenedorId);
    const filas = contenedorMatriz.querySelectorAll(".fila");
    const matriz = [];
    filas.forEach(fila => {
        const elementos = fila.querySelectorAll(".elemento");
        const filaMatriz = Array.from(elementos).map(elemento => parseInt(elemento.value));
        matriz.push(filaMatriz);
    });
    return matriz;
}

// Función para mostrar la matriz resultado
function mostrarMatrizResultado(matriz) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h2>Matriz Resultante:</h2>";

    const table = document.createElement("table");
    matriz.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    resultadoDiv.appendChild(table);
}

