const fgDiv = document.getElementById('fgDiv')


let scaling = false
let pinchX
let pinchY
let touchDist

let imageEl

let imageW
let imageH


const onTouchStart = (e) => {
    console.log('start')
    imageEl = document.getElementById('image')
    if (e.touches.length === 2) {
        scaling = true
        let dx = e.touches[0].screenX-e.touches[1].screenX
        let dy = e.touches[0].screenY-e.touches[1].screenY

        pinchX = e.touches[0].clientX+(e.touches[1].clientX-e.touches[0].clientX)/2
        pinchY = e.touches[0].clientY+(e.touches[1].clientY-e.touches[0].clientY)/2

        touchDist = Math.sqrt((dx*dx)+(dy*dy))

        imageW = imageEl.style.width
        imageH = imageEl.style.height

        e.preventDefault()
        e.stopPropagation()
        return false
    }
}

const onTouchMove = (e) => {
    console.log('move')
    if (scaling) {
        var dx = e.touches[0].screenX-e.touches[1].screenX;
        var dy = e.touches[0].screenY-e.touches[1].screenY;

        var touchDist2 = Math.sqrt((dx*dx)+(dy*dy));

        var scale = (((touchDist2/touchDist)-1)*1)+1;

        if ((imageW * scale) > 50) {
            imageEl.style.width = (imageW*scale) + 'px'
            console.log('width', (imageW*scale) + 'px')
            imageEl.style.height = (imageH*scale) + 'px'
            console.log('height', (imageW*scale) + 'px')
        }

        e.preventDefault()
    }
}

const onTouchEnd = (e) => {
    console.log('end')
    if (scaling) {
        scaling = false
         imageW = imageEl.style.width
         imageH = imageEl.style.height
    }
}

fgDiv.addEventListener('touchstart', onTouchStart, false)
fgDiv.addEventListener('touchmove', onTouchMove, false)
fgDiv.addEventListener('touchend', onTouchEnd, false)