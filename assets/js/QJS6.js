let QJS6Tools = {
    AjaxQueryBase: class{
        constructor(url,async){
            this.url = url;
            this.async = async;
            this.ajax = new XMLHttpRequest();
            this.response = "";
    
            this.onload =  () => {
                if(this.ajax.status == 200){
                    let response = this.convert(this.ajax.responseText);
                    this.success(response);
                }else{
                    this.failed();
                }
            }
    
            this.ajax.onload = this.onload;
    
            this.convert = (obj) => {
                return obj;
            }
            this.oncall = () =>{
                
            }
            this.success = () => {
    
            }
            this.failed = () => {
    
            }
            this.beforeCall = () => {
    
            }
            this.call = () =>{
                this.beforeCall();
                this.ajax.send();
                this.oncall();
            }
        }
    },
    AnimationBase: class{
        constructor(classCss) {
            this.element = document.querySelectorAll(classCss);
            this.callback = (event) =>{
                
            }

            this.removeAnimation = new Map();
            let parent =  this;
            this.element.forEach((object) => {
                object.addEventListener("animationend",function(event) {
                    parent.callback(this);
                })
            })
        }
        addAnimation(animationName){
            this.element.forEach((object) => {
                if(object.style.display != "none"){
                    object.classList.add(animationName);
                }
            })
        }
    },
    Event: class{
        constructor(element){
            this.buffer = [];
            let self = this;
            this.element = element;
            this.animName = "dqsoihdoqhd";
            document.addEventListener("animationend",(event) => {
                for(let i = 0; i < self.element.length;i++){
                    self.func(self.element[i]);
                }
            })
            this.applyAfter = (animationName,call) => {
                buffer.add(animationName,call);
            }
        }
    },
    Mixin: class{
        constructor(){
            this.parentInherit = new Map();
            this.addElement = (...mixin) => {
                let self = this;
                mixin.forEach((value) => {
                    let data = new Map();
                    for(let property in value){
                        data.set(value[property],property)
                    }
                    self.parentInherit.set(data,value.constructor.name);
                })    
            }

            this.getParent = (name) => {
                let val;
                this.parentInherit.forEach((key,value) => {
                    if(name == key){
                        val = value;
                        this.listProperty(value);
                    }
                })
                return val;
            }

            this.getFrom = (parent,name) => {
                let val;
                parent.forEach((key,value) => {
                    if(key == name){
                        val = value;
                    }
                })
                return val
            }
            this.listProperty = (parent) => {
                parent.forEach((key,value) => {
                    console.log(key);
                    console.log(typeof(value));
                })
            }
        }
    }
}
let QJS6 = {
    Animation: {
        Fader: class extends QJS6Tools.Mixin{
            constructor() {
                super();
                this.addElement(new QJS6Tools.Event,new QJS6Tools.AnimationBase);
                this.event = this.getParent("Event");
                this.animation = this.getParent("AnimationBase");

                let name = this.getFrom(this.event,"animName");
                let func = this.getFrom(this.animation,"addAnimation");
                
                

                this.fromEvent = (variable) => {
                    return this.getFrom(this.event,variable);
                }
                this.fromAnimation = (variable) => {
                    return this.getFrom(this.animation,variable)
                }
            }
            fadeElmeent(option) {
                if(option == "in"){
                    event("fadeIn")
                }else if(option == "out"){
                    event("fadeOut");
                }
            }
        }
    },
    Ajax: {
        Vanilla: class extends QJS6Tools.AjaxQueryBase{
            constructor(type,url,async){
                if(type == "post"){
                    this.method = new this.Post(url,async);
                }else if(type == "get"){
                    this.method = new this.Get(url,async);
                }
            }
            call(){
                if(this.method != undefined){
                    this.method.call();
                }else{
                    console.log("Undefined method");
                }
            }
        },
        Post: class extends QJS6Tools.AjaxQueryBase {
            constructor(url,async){
                super(url,async);
                this.beforeCall = () => {
                    this.ajax.open("post",this.url,this.async);
                }
            }
        },
        Get: class extends QJS6Tools.AjaxQueryBase {
            constructor(url,async){
                super(url,async);
                this.beforeCall = () => {
                    this.ajax.open("get",this.url,this.async);
                }
            }
        },
        Buffers: class {
            constructor(){
                this.bufferObj = new Map();
                let parent = this;
                this.called = 0;
                this.success = (obj) => {
                    parent.bufferObj.forEach((key,value) => {
                        value.function(obj[key],value.target);
                    })
                    parent.onSuccess();
                    parent.called++;
                }
                this.onSuccess = () => {

                }
            }
            add(key,value,multiple,func){
                let tar = (multiple ? document.querySelectorAll(value) : document.querySelector(value));
                this.bufferObj.set({
                    target:tar,
                    function:func
                },key);
            }
            getElement(key){
                if(this.bufferObj.has(key)){
                    return this.bufferObj.get(key).value;
                }
                return undefined;
            }
        } 
    }
}