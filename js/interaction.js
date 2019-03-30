

// engine - computation and math behind the interaction
// renderer - this draws the engine

// alias - deconstruct to make the code slightly cleaner
const {Engine, Render, Bodies, World} = Matter


// wherever the canvas is being deployed
const sectionTag = document.querySelector('section.shapes')

const w = window.innerWidth
const h = window.innerHeight


const engine = Engine.create()
const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        height: h,
        width: w,
        // background: '#000000',
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
})


// create a shape
let i = 0
const createShapes = function (x, y) {

    const colors = ['#000000', '#ffffff', '#d1d1d1']
    const nextColor = colors[i]
        i = i + 1
        if (i > colors.length - 1) {
        i = 0
    }

    return Bodies.circle(x, y, 36, {
        render: {
            fillStyle: nextColor
        } 
    })
}

// const bigBall = Bodies.circle(w / 2, h / 2, 250, {
//     isStatic: true,
//     render: {
//         fillStyle: '#ffffff'
//     }
// })



// add walls
const wallOptions = {
    isStatic: true,
    render: {
        visible: false
    }
} 

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

World.add(engine.world, [
    // bigBall,
    ceiling,
    ground,
    leftWall,
    rightWall
])

// click and add new shape
document.addEventListener('click', function (event) {
    const shape = createShapes(event.pageX, event.pageY)

    World.add(engine.world, shape)

})





// run both the engine and the renderer
Engine.run(engine)
Render.run(renderer)