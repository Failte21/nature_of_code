let xOff = 0
let yOff = 0
let walker
const walkers = []

function setup() {
    createCanvas(500, 500)
    background(51)
    walker = new Walker()
    for (let y = 0; y < height; y += 20) {
        for (let x = 0; x < width; x += 20) {
            walkers.push(new Walker(x, y, color(x - y)))
        }
    }
}

function draw() {
    // walker.update()
    // walker.display()

    walkers.forEach(w => {
        w.update();
        w.display();
    })
    xOff++
    yOff++
}

function Walker(x, y, color) {
    this.buffer = []
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)

    this.update = function() {
        this.acc = createVector(random(-0.05, 0.05), random(-0.05, 0.05))
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.color = color

        // L'appel au createVector est nécessaire pour éviter de copier seulement une référence
        this.buffer.push(createVector(this.pos.x, this.pos.y))
    }

    this.display = function() {
        stroke(color)
        ellipse(this.pos.x, this.pos.y, 1, 1)

        if (this.buffer.length > 5) {
            const pos = this.buffer.shift()
            stroke(51)
            ellipse(pos.x, pos.y, 1, 1)
        }
    }
}