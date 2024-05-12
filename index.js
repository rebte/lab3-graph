const fs = require('fs');
const { randomInit } = require('./random');
const {
	printMatrix,
	drawArrow,
	drawLine,
	drawCircleArrow,
	drawCircle,
	canvasInit,
} = require('./utilities');

// 3410

const n = 10 + 1;
const seed = 3410;
const coef = 1 - 1 * 0.02 - 0 * 0.005 - 0.25;
const matrixDir = [];

const width = 1000;
const heigth = 1000;
const { canvas, ctx } = canvasInit(width, heigth, '2d', '#fff');

const peaksCoord = [];
const distance = 350;
const center = 500; // (500, 500)
const peakRadius = 30;

const random = randomInit(seed, 0, 2);

for (let k = 0; k < n; k++) {
	matrixDir[k] = [];
	for (let j = 0; j < n; j++) {
		const v = Math.floor(random() * coef);
		matrixDir[k][j] = v;
	}
}

console.log('Матриця:');
printMatrix(matrixDir);

for (let i = 0; i < n; i++) {
	peaksCoord.push({
		x: center + distance * Math.cos((2 * Math.PI * i) / n),
		y: center + distance * Math.sin((2 * Math.PI * i) / n),
	});
}

peaksCoord.forEach((el, index) => {
	drawCircle(ctx, el.x, el.y, peakRadius, '#fcba03', index + 1);
});

for (let k = 0; k < n; k++) {
	for (let j = 0; j < n; j++) {
		if (matrixDir[k][j] === 1) {
			if (matrixDir[k][j] === 1 && matrixDir[j][k] === 1 && j === k) {
				const circleDrawR = 20;
				const vector = [
					peaksCoord[j].x - center,
					peaksCoord[j].y - center,
				];
				const vectorLength = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
				vector[0] = vector[0] / vectorLength;
				vector[1] = vector[1] / vectorLength;

				drawCircleArrow(
					ctx,
					peaksCoord[j].x + (peakRadius + circleDrawR) * vector[0],
					peaksCoord[j].y + (peakRadius + circleDrawR) * vector[1],
					peaksCoord[j].x + peakRadius * vector[0],
					peaksCoord[j].y + peakRadius * vector[1],
					circleDrawR,
					3,
					'#a104c4'
				);
			} else {
				const vector = [
					peaksCoord[j].x - peaksCoord[k].x,
					peaksCoord[j].y - peaksCoord[k].y,
				];
				const vectorLength = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
				vector[0] = vector[0] / vectorLength;
				vector[1] = vector[1] / vectorLength;

				if (matrixDir[k][j] === 1 && matrixDir[j][k] === 1) {
					drawLine(
						ctx,
						peaksCoord[k].x + peakRadius * vector[0],
						peaksCoord[k].y + peakRadius * vector[1],
						peaksCoord[j].x - peakRadius * vector[0],
						peaksCoord[j].y - peakRadius * vector[1],
						3,
						'#0469cf'
					);
				} else {
					drawArrow(
						ctx,
						peaksCoord[k].x + peakRadius * vector[0],
						peaksCoord[k].y + peakRadius * vector[1],
						peaksCoord[j].x - peakRadius * vector[0],
						peaksCoord[j].y - peakRadius * vector[1],
						3,
						'#04b807'
					);
				}
			}
		}
	}
}

const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync('./output.jpg', buffer);
