let listaElementow = []
let h = true
let wybrany = null;

let clc = false

let pivot = 1
//0 - middle top, 1 - middle center, 2 - middle bottom

document.addEventListener("click", MoveElement);
function CreateElement(element_name){
    const zdjecie = document.createElement("img")
    zdjecie.addEventListener("dblclick", function(){wybrany = zdjecie})
    zdjecie.className = "element pracowni"
    zdjecie.id = element_name
    document.body.appendChild(zdjecie)
    zdjecie.style.position = 'absolute'
    zdjecie.src = `img/${element_name}.png`
    listaElementow.push(zdjecie)
    wybrany = zdjecie;
    h = true
}
document.body.onmousedown = StopMoving
document.body.addEventListener('keydown', StopMoving)

function StopMoving(e) {
    if (!e) return
    if(wybrany == null) {

    }else if(e.button === 1 || e.ctrlKey) {
        wybrany = null
        h = false
    }else if(e.code === "KeyX" || e.code === "KeyC"){
        wybrany.remove()
    }else if(e.code === "KeyZ"){
        pivot < 2 ? pivot++ : pivot = 0
    }

}
function MoveElement(event){
    if(wybrany == null) return

    if(pivot === 0) {
        wybrany.style.left = event.clientX - wybrany.width / 2;
        wybrany.style.top = event.clientY - wybrany.height;
    }
    if(pivot === 1) {
        wybrany.style.left = event.clientX - wybrany.width / 2;
        wybrany.style.top = event.clientY - wybrany.height / 2;
    }
    if(pivot === 2) {
        wybrany.style.left = event.clientX - wybrany.width / 2;
        wybrany.style.top = event.clientY;
    }
    wybrany.style.zIndex = 1080 - event.clientY;
}




