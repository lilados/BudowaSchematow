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
let Indexowe = ["{", "}"]

function Configurate(nazwa_klucza, wartosc){
    let Nazwa = ""
    Nazwa = wartosc.toUpperCase()
    
    switch (nazwa_klucza){
        case 'del': KeyDelete = `Key${Nazwa}`; break
        case 'piv': KeyPivot = `Key${Nazwa}`; break
        case 'mode': KeyMode = `Key${Nazwa}`; break
        case 'undo': KeyUndo = `Key${Nazwa}`; break
        case 'index': Indexowe[0] = wartosc[0], Indexowe[1] = wartosc[1]; break
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
    }else if(e.code === KeyUndo){
        undo()
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
let edytowanoTekst = false
function AddText(e){
    if(dblcl !== 1) return;
    let newText = document.createElement('p')
    newText.style.position = 'absolute'
    newText.style.fontSize = '20pt'
    newText.style.fontFamily = 'Verdana'
    newText.style.textTransform = 'Capitalize'
    newText.addEventListener('dblclick', function (){
        if(dblcl === 0)newText.remove()
        else if(dblcl === 1){edytowanoTekst = true; newText.innerText = formatTekstu(prompt(`Zmień tekst ${newText.innerText}`))}
    })

    if(!edytowanoTekst)newText.innerText = prompt('Podaj tekst')

    newText.innerHTML = formatTekstu(newText.innerHTML)
    newText.style.textTransform = 'capitalize'
    newText.style.height = "1em"

    edytowanoTekst = false

    if(newText.innerText === "")return

    document.body.appendChild(newText)
    switch(pivot){
        case 0: newText.style.top = e.clientY - newText.clientHeight/2
            newText.style.left = e.clientX;break
        case 1: newText.style.top = e.clientY - newText.clientHeight/2
            newText.style.left = e.clientX - newText.clientWidth/2;break
        case 2: newText.style.top = e.clientY - newText.clientHeight/2
            newText.style.left = e.clientX - newText.clientWidth;break
    }
}

function formatTekstu(str){
    let strBuilder = ""
    let Format = false
    let i = 0
    while(i < str.length){
        if(str[i] !== Indexowe[0] && !Format) {
            strBuilder += str[i]
        }else if(str[i] === Indexowe[0]){
            Format = true
            for (let j = 0; j < str.length - i; j++) {
                if(str[j+i] === Indexowe[1]){
                    switch (str[i+1]){
                        case 'u': strBuilder += `<sup>${str.substring(i+2, i+j)}</sup>`
                            break
                        case 'g': strBuilder += `<sup>${str.substring(i+2, i+j)}</sup>`
                            break
                        case 'b': strBuilder += `<sub>${str.substring(i+2, i+j)}</sub>`
                            break
                        case 'd': strBuilder += `<sub>${str.substring(i+2, i+j)}</sub>`
                            break
                    }
                    i += j
                    Format = false
                    break
                }
            }
        }

        i++
    }

    return strBuilder
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
        
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');
        const lines = [];
        const drawnLines = [];

        let isDrawing = false;
        let startCoords = { x: 0, y: 0 };
        
        function startDrawing(event) {
            if(dblcl === 2){
            isDrawing = true;
            // Pobierz początkowe współrzędne po kliknięciu myszką
            startCoords.x = event.clientX - canvas.offsetLeft;
            startCoords.y = event.clientY - canvas.offsetTop;
            }
        }

        function stopDrawing(event) {
            if(dblcl === 2){
            if (isDrawing){
                // Pobierz końcowe współrzędne po puściu przycisku myszy
                const endCoords = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

                // Narysuj linię od początkowych do końcowych współrzędnych
                context.beginPath();
                context.moveTo(startCoords.x, startCoords.y);
                context.lineTo(endCoords.x, endCoords.y);
                context.strokeStyle = 'black';
                context.lineWidth = 2;
                context.stroke();

                // Dodaj linię do tablicy lines
                lines.push({ startX: startCoords.x, startY: startCoords.y, endX: endCoords.x, endY: endCoords.y });
                drawnLines.push({ startX: startCoords.x, startY: startCoords.y, endX: endCoords.x, endY: endCoords.y });

                isDrawing = false;
            }
            }
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);

        function undo() {
            if (drawnLines.length > 0) {
                // Usuń ostatnią narysowaną linię z płótna
                const lastLine = drawnLines.pop();
                clearCanvas();
                // Narysuj wszystkie linie z tablicy drawnLines ponownie
                for (const line of drawnLines) {
                    context.beginPath();
                    context.moveTo(line.startX, line.startY);
                    context.lineTo(line.endX, line.endY);
                    context.strokeStyle = 'black';
                    context.lineWidth = 2;
                    context.stroke();
                }
                // Usuń ostatnią linię z tablicy lines
                lines.pop();
            }
        }

        // Nasłuch na kliknięcie przycisku "Cofnij"
        const undoButton = document.getElementById('undoButton');
        undoButton.addEventListener('click', undo);

        // Funkcja do wyczyszczenia płótna
        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        
