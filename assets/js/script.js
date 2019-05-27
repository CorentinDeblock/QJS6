let btn = document.querySelector("#quotation #reloader")

let fade = new QJS6.Animation.Fader();
let ajax = new QJS6.Ajax.Get("https://thatsthespir.it/api",true);
let buffer = new QJS6.Ajax.Buffers();


function applyHTML(element,content){
    element.innerHTML = content;
}
function applySrc(img,content){
    if(content != ""){
        img.style.display = "block";
        img.src = content;
    }else{
        img.style.display = "none";
    }
}

function listAnimation(value){
    if(value.classList.contains("fade")){
        value.classList.remove("fade");
    }
}

fade.applyAfterFade("fadeIn",listAnimation);

function applyText(element,content){
    element.innerText = content;
}
buffer.onSuccess = () => {
    if(buffer.called == 0){
        fade.fadeElement("in");
    }
}
buffer.add("photo","#quotation img",false,(key,value) => {
    if(buffer.called == 0){
        applySrc(value,key);
    }else{
        fade.applyAfterFade("out",(element) => {
            applySrc(value,key);
        })
    }
})
buffer.add("quote","#quotation blockquote",false,(key,value) => {
    if(buffer.called == 0){
        applyHTML(value,key);
    }else{
        fade.applyAfterFade("out",(element) =>{
            applyHTML(value,key);
            console.log("apply after");
        })
    }
})
buffer.add("author","#quotation #author",false,(key,value) => {
    if(buffer.called == 0){
        applyText(value,key);
    }else{
        fade.applyAfterFade("out",(element) => {
            applyText(value,key);
        })
    }
})
buffer.onSuccess = () => {
    fade.fadeElement("in");
}

buffer.beforeCall = () => {
    if(buffer.called > 0){
        fade.fadeElement("out");
    }
}

ajax.convert = (obj) => {
    return JSON.parse(obj);
}

ajax.success = buffer.success;

ajax.failed = () => {
    console.log('request failed');
}

ajax.call();

btn.addEventListener("click",ajax.call);