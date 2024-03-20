import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

// Función para sumar matrices
function sumarMatrices(matriz1, matriz2) {
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        throw new Error("Las matrices deben tener la misma dimensión para poder sumarse.");
    }

    const resultado = [];
    for (let i = 0; i < matriz1.length; i++) {
        resultado[i] = [];
        for (let j = 0; j < matriz1[0].length; j++) {
            resultado[i][j] = matriz1[i][j] + matriz2[i][j];
        }
    }
    return resultado;
}

// Ruta para sumar matrices
app.post('/sumar-matrices', (req, res) => {
    const matriz1 = req.body.matriz1;
    const matriz2 = req.body.matriz2;

    
    try {
        const resultado = sumarMatrices(matriz1, matriz2);
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

