const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const SIZE = 32;
const PATH_TO_WRITE_TO = path.join(__dirname, "..", "..", "assets", "Items");

function randDarkColor() {
	var lum = -0.25;
	var hex = String(
		"#" + Math.random().toString(16).slice(2, 8).toUpperCase()
	).replace(/[^0-9a-f]/gi, "");
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	var rgb = "#",
		c,
		i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
		rgb += ("00" + c).substr(c.length);
	}
	return rgb;
}

const createImage = (itemName) => {
	console.log('Creating ' + itemName);

	const canvas = createCanvas(SIZE, SIZE);
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	
	ctx.beginPath()
	ctx.arc(SIZE / 2, SIZE / 2, 15, 0, 2 * Math.PI)
	ctx.fillStyle = randDarkColor();
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.font = "24px Arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.strokeStyle = 'white';
	ctx.stroke()
	ctx.fillText(itemName.substr(0, 1), SIZE / 2, SIZE / 2)

	const buffer = canvas.toBuffer("image/png");

	const filename = path.join(PATH_TO_WRITE_TO, `${itemName}.png`);

	fs.writeFileSync(filename, buffer);
};

module.exports = createImage;
