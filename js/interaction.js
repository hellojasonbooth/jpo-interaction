

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
const createShape = function (x, y) {

    const colors = ['#4d18f8', '#ffffff', '#36e3a7', 'pink', '#f80834']
    const nextColor = colors[i]
        i = i + 1
        if (i > colors.length - 1) {
        i = 0
    }



    return Bodies.circle(x, y, 20 + 20 * Math.random(), {
        render: {
            fillStyle: nextColor
        } 
    })
}



// click and add new shape
document.addEventListener('click', function (event) {
    const shape = createShape(event.pageX, event.pageY)

    World.add(engine.world, shape)

})





// run both the engine and the renderer
Engine.run(engine)
Render.run(renderer)