import './style.css'
import { imgData } from './imgBase64';
import { canvas, ctx, mapImage, Pixel } from './state';
import { Particles } from './classes';

canvas.width = 445;
canvas.height = 710

const img1 = new Image();
img1.src = imgData

let arrayParticles: Particles[] = []
let countParticle = 5000





img1.addEventListener("load", () => {
  ctx.drawImage(img1, 0, 0)
  const scanImg = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let y = 0; y < canvas.height; y++) {
    let row: Pixel[] = []
    for (let x = 0; x < canvas.width; x++) {
      const r = scanImg.data[(y * 4 * scanImg.width) + (x * 4)]
      const g = scanImg.data[(y * 4 * scanImg.width) + (x * 4 + 1)]
      const b = scanImg.data[(y * 4 * scanImg.width) + (x * 4 + 2)]
      const britness = calculateBritness(r, g, b);
      row.push({
        britness,
        r,
        g,
        b,
      })
    }
    mapImage.push(row)
  }
  console.log(mapImage);

  makeParticles()

  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 0.2
    for (let i = 0; i < arrayParticles.length; i++) {
      arrayParticles[i].update();
      ctx.globalAlpha = arrayParticles[i].speed;
      arrayParticles[i].draw();
    }
    requestAnimationFrame(animate)
  }
  animate()

})

function calculateBritness(red: number, green: number, blue: number) {
  return Math.sqrt(
    (Math.pow(red, 2) * 0.299) +
    (Math.pow(green, 2) * .587) +
    (Math.pow(blue, 2) * .114)
  ) / 100
}
function makeParticles() {
  for (let i = 0; i < countParticle; i++) {
    arrayParticles.push(new Particles)
  }
}
