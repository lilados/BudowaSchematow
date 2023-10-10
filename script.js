let listaElementow = []
let h = true
let wybrany = null;

let clc = false

let pivot = 1
//0 - middle top, 1 - middle center, 2 - middle bottom
let dblcl = 0
//0 - edycja pozycji, 1 - dodawanie tekstu, 2 - dodawanie linii

let KeyDelete = "KeyX"
let KeyPivot = "KeyZ"
let KeyMode = "KeyQ"
let KeyUndo = "KeyE"

function Configurate(nazwa_klucza, wartosc){
    switch (nazwa_klucza){
        case 'del': KeyDelete = `Key${wartosc}`; break
        case 'piv': KeyPivot = `Key${wartosc}`; break
        case 'mode': KeyMode = `Key${wartosc}`; break
        case 'undo': KeyUndo = `Key${wartosc}`; break
    }
}




document.addEventListener("click", MoveElement);
function CreateElement(element_name){
    const zdjecie = document.createElement("img")
    zdjecie.addEventListener('dblclick', function(){if(dblcl === 0)wybrany = zdjecie})
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
document.body.addEventListener('dblclick', AddText)

function StopMoving(e) {
    if (!e) return
    if(e.code === KeyMode){
        dblcl < 2 ? dblcl++ : dblcl = 0
        switch (dblcl){
            case 0: document.getElementById("stylDbl").innerText = 'open_with'; break;
            case 1: document.getElementById("stylDbl").innerText = 'title'; break;
            case 2: document.getElementById("stylDbl").innerText = 'polyline'; break;
        }
    }else if(e.code === KeyPivot){
        pivot < 2 ? pivot++ : pivot = 0
        switch (pivot){
            case 0: document.getElementById("stylPivot").innerText = 'vertical_align_bottom'; break;
            case 1: document.getElementById("stylPivot").innerText = 'vertical_align_center'; break;
            case 2: document.getElementById("stylPivot").innerText = 'vertical_align_top'; break;
        }
    }
    if(wybrany == null) {

    }else if(e.button === 1 || e.ctrlKey) {
        wybrany = null
        h = false
    }else if(e.code === KeyDelete){
        wybrany.remove()
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
let oknoState = false
let idOkna = ''
let state = false;
g = []
g = document.getElementsByClassName('WysOkna')
function expand(){
    if(wybrany != null)wybrany.remove()

    for (let i = 0; i < g.length; i++) {
        g[i].style.display = 'none'
    }
    if(state===false){
        document.getElementById("items").style.transform='scaleX(1)';
        document.getElementById("toggle").style.transform='rotate(45deg)';
        state=true;
    }else{
        document.getElementById("items").style.transform='scaleX(0)';
        document.getElementById("toggle").style.transform='rotate(0deg)';
        state=false;
    }

}
function AddText(e){
    if(dblcl === 0) return;
    let newText = document.createElement('p')
    newText.style.position = 'absolute'
    newText.style.top = e.clientY
    newText.style.left = e.clientX
    newText.addEventListener('dblclick', function (){if(dblcl === 0)newText.remove()})
    newText.innerText = prompt('Podaj tekst')
    if(newText.innerText === "") return
    document.body.appendChild(newText)
}

function ToggleVisibility(id){
    if(wybrany != null)wybrany.remove()

    idOkna = id
    let elem = document.getElementById(id).style.display
    for (let i = 0; i < g.length; i++) {
        elem !== g[i] ? g[i].style.display = 'none' : null
    }
    elem === 'block' ?(document.getElementById(id).style.display = 'none', idOkna = ""):
    (document.getElementById(id).style.display = 'block', oknoState = true)
}

let linie = []

function Undo(){

}

