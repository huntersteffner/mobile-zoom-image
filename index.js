const fgDiv = document.getElementById('fgDiv')


let zoomPinchMode = 0
let pinchX
let pinchY
let touchDist
let imageEl
let imageW
let imageH
let offsetX
let offsetY
let imageZoomed = false


const onTouchStart = (e) => {
    // Obtain image to zoom in
    imageEl = document.getElementById('image')
    // If only one finger is touching screen
    if (e.touches.length === 1) {
        // 
        zoomPinchMode = 1

        const imageTop = imageEl.offsetTop
        const imageLeft = imageEl.offsetLeft

        offsetX = e.touches[0].clientX - imageLeft
        offsetY = e.touches[0].clientY - imageTop
    }
    // If two fingers are touching screen
    if (e.touches.length === 2) {
        zoomPinchMode = 2
        const dx = e.touches[0].screenX-e.touches[1].screenX
        const dy = e.touches[0].screenY-e.touches[1].screenY

        pinchX = e.touches[0].clientX+(e.touches[1].clientX-e.touches[0].clientX)/2
        pinchY = e.touches[0].clientY+(e.touches[1].clientY-e.touches[0].clientY)/2

        const imageTop = imageEl.offsetTop
        const imageLeft = imageEl.offsetLeft

        offsetX = e.touches[0].clientX - imageLeft
        offsetY = e.touches[0].clientY - imageTop

        touchDist = Math.sqrt((dx*dx)+(dy*dy))

        imageW = imageEl.width
        imageH = imageEl.height

        e.preventDefault()
        e.stopPropagation()		  
        return false

    }
}

const onTouchMove = (e) => {
    // Dragging image around
    if (e.touches.length === 1 && zoomPinchMode === 1) {
        const ox = e.touches[0].clientX - offsetX
        const oy = e.touches[0].clientY - offsetY
        
        imageEl.style.position = 'absolute'
        imageEl.style.left = ox + 'px'
        imageEl.style.top = oy + 'px'

        e.preventDefault()
        e.stopPropagation()		  
        return false
    }
    // Actively zooming in and out
    if (e.touches.length=== 2 && zoomPinchMode === 2) {
        const dx = e.touches[0].screenX-e.touches[1].screenX;
        const dy = e.touches[0].screenY-e.touches[1].screenY;

        const touchDist2 = Math.sqrt((dx*dx)+(dy*dy));

        const scale = (((touchDist2/touchDist)-1)*1)+1;

        const ox = (pinchX) - (offsetX * scale)
        const oy = (pinchY) - (offsetY * scale)

        if ((imageW * scale) > 50) {
            imageEl.style.position = 'absolute'
            imageEl.style.left = ox + 'px'
            imageEl.style.top = oy + 'px'
            imageEl.style.width = (imageW*scale) + 'px'
            imageEl.style.height = (imageH*scale) + 'px'
        }

        e.preventDefault()
        e.stopPropagation()		  
        return false

    }
}

const onTouchEnd = (e) => {
    zoomPinchMode = 0
    imageW = imageEl.style.width
    imageH = imageEl.style.height

}

const doubleTapZoom = () => {
    if (imageZoomed) {
        resetZoom()
    } else {
        imageH = imageEl.offsetHeight
        imageW = imageEl.offsetWidth

        const newzoomImageH = imageH * 3
        const newzoomImageW = imageW * 3

        imageEl.style.height = `${newzoomImageH}px`
        imageEl.style.width = `${newzoomImageW}px`
        imageEl.style.position = 'absolute'
        imageEl.style.left = `-${newzoomImageW * 0.33}px`
        imageEl.style.top = `-${newzoomImageH * 0.33}px`

        imageZoomed = true
    }
}

const resetZoom = () => {
    if (imageEl !== null && mode !== 2) {
        imageEl.style.height = null
        imageEl.style.width = null
        imageEl.style.left = null
        imageEl.style.top = null
        imageEl.style.position = 'static'
    
        imageZoomed = false
    }
}

fgDiv.addEventListener('touchstart', onTouchStart, false)
fgDiv.addEventListener('touchmove', onTouchMove, false)
fgDiv.addEventListener('touchend', onTouchEnd, false)