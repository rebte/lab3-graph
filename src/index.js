const { randomInit } = require('./random');
const { printMatrix } = require('./utilities');
const { DrawingMatrix } = require('./drawingMatrix');

// 3410

const n = 10 + 1;
const seed = 3410;
const coef = 1 - 1 * 0.02 - 0 * 0.005 - 0.25;
const matrixDir = [];
const matrixUndir = [];

const random = randomInit(seed, 0, 2);

for (let k = 0; k < n; k++) {
	matrixDir[k] = [];
	if (!matrixUndir[k]) {
		matrixUndir[k] = [];
	}

	for (let j = 0; j < n; j++) {
		const v = Math.floor(random() * coef);
		matrixDir[k][j] = v;

		if (!matrixUndir[k][j]) {
			matrixUndir[k][j] = v;
		}

		if (v === 1 && k !== j) {
			if (!matrixUndir[j]) {
				matrixUndir[j] = [];
			}
			matrixUndir[j][k] = v;
		}
	}
}

console.log('Направлена матриця:');
printMatrix(matrixDir);
console.log('\nНенаправлена матриця:');
printMatrix(matrixUndir);

const drawingMatrix = new DrawingMatrix(1000, n);

drawingMatrix.drawDirMatrix(matrixDir);
drawingMatrix.drawUndirMatrix(matrixUndir);
