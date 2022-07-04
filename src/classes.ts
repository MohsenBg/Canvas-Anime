import { canvas, ctx, mapImage } from "./state";

export class Particles {
    x;
    y;
    speed;
    velocity;
    size;
    postion1;
    postion2;
    color;
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0
        this.speed = 0
        this.velocity = Math.random() * 3.5
        this.size = Math.random() * 1.5 + 1
        this.color = "white"
        this.postion1 = Math.floor(this.y)
        this.postion2 = Math.floor(this.x)
    }
    update() {

        this.postion1 = Math.floor(this.y)
        this.postion2 = Math.floor(this.x)
        if (mapImage[this.postion1] == undefined || mapImage[this.postion1][this.postion2] == undefined)
            return
        const { britness, r, g, b } = mapImage[this.postion1][this.postion2]
        this.speed = britness
        this.color = `rgb(${r},${g},${b})`
        let movement = (2.5 - this.speed) + this.velocity;
        this.y += movement
        if (this.y >= canvas.height) {
            this.y = 0
            this.x = Math.random() * canvas.width
        }
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }

}
