let textField = document.getElementById("textField");
let addButton = document.getElementById("addButton");
let clearButton = document.getElementById("clearButton");

let text;

addButton.onclick = () => {
    text = textField.value;
    if(text == '') 
        return;
    let paragraph = document.createElement('p');
    document.body.appendChild(paragraph)
    paragraph.textContent = text;
    text = '';
}

clearButton.onclick = () => {
    text = '';
    textField.value = text;
    document.querySelectorAll('p').forEach(paragraph => paragraph.remove());
}