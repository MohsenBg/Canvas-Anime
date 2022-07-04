//@ts-ignore
export const canvas: HTMLCanvasElement = document.getElementById("canvas1")

//@ts-ignore
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d')


export interface Pixel {
    britness: number,
    r: number,
    g: number,
    b: number,
}
export let mapImage: Pixel[][] = []
