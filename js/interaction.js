

// engine - computation and math behind the interaction
// renderer - this draws the engine

// alias - deconstruct to make the code slightly cleaner
const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter

Matter.use('matter-wrap')


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
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
})


// create jpo shapes
let i = 0
const createShapes = function (x, y) {

    const monoColors = ['#000000', '#ffffff', '#d1d3d4']
    const nextColor = monoColors[i]
        i = i + 1
        if (i > monoColors.length - 1) {
        i = 0
    }


    if (window.innerWidth < 600) {
        return Bodies.circle(x, y, 24, {
            restitution: 0.5,
            frictionAir: 0 + (Math.random() * 0.06),
            render: {
                fillStyle: nextColor
            },
            plugin: {
                wrap: {
                    min: {x: 0, y: 0},
                    max: {x: w, y: h}
                }
            }
        })
    }   else {
            return Bodies.circle(x, y, 36, {
                restitution: 0.6,
                frictionAir: 0 + (Math.random() * 0.06),
                render: {
                    fillStyle: nextColor
                },
                plugin: {
                    wrap: {
                        min: {x: 0, y: 0},
                        max: {x: w, y: h}
                    }
                }
            })
        }  

}



// add walls to the canvas
const wallOptions = {
    isStatic: true,
    render: {
        visible: false
    }
} 

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions)
// const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
// const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
})


const initialShapes = Composites.stack(w / 5, 0, 5, 3, w / 2, h / 3, function (x, y) {
    return createShapes(x, y)
})



World.add(engine.world, [
    ceiling,
    ground,
    // leftWall,
    // rightWall,
    mouseControl,
    initialShapes
])


// a check to see if mouse touches a shape
document.addEventListener('click', function (event) {
    const vector = { x: event.pageX, y:event.pageY }
    const hoveredShapes = Query.point(initialShapes.bodies, vector)

    const colors = ['#dd634a', '#6cac92', '#001c54', '#cadee8', '#ffffff', '#000000', '#d1d3d4']
    const nextColor = colors[i]
        i = i + 1
        if (i > colors.length - 1) {
        i = 0
    }

    hoveredShapes.forEach(shape => {
        shape.render.fillStyle = nextColor
    })

})



// run both the engine and the renderer
Engine.run(engine)
Render.run(renderer)


// window.addEventListener('deviceorientation', function (event) {
//     engine.world.world.x = event.gamma / 30
//     engine.world.world.y = event.beta / 30
// })


// gravity changed by a timer
let time = 0.01
const changeGravity = function () {
    time = time + 0.003
    engine.world.gravity.y = Math.cos(time) * 0.01
    engine.world.gravity.x = Math.sin(time) * 0.01

    requestAnimationFrame(changeGravity)
}

changeGravity()






