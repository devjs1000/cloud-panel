import axios from 'axios'

const serverAddress=document.querySelector('#server')
const request=document.querySelector('#request')

const json=document.querySelector('#json')

const makeJsonArrayRequest=()=>{
    const parsedJson=JSON.parse(json.value)
    if(Array.isArray(parsedJson)){
        for (var i = parsedJson.length - 1; i >= 0; i--) {
            axios.post(serverAddress.value+request.value, parsedJson[i])
        }
    }else{
        axios.post(serverAddress.value+request.value, parsedJson)
    }
    
}

const getJson=()=>{
    fetch(serverAddress.value+request.value).then(res=>res.json()).then(data=>{
json.value=JSON.stringify(data)
    })
}

document.getElementById('post').addEventListener('click', (e)=>{
    makeJsonArrayRequest()
})
document.getElementById('get').addEventListener('click', (e)=>{
    getJson()
})

const fileSelector=document.getElementById('file-selector')
const sendImage=document.querySelector('#sendImage')

    const uploadImage = async (base64EncodedImage) => {
        try {
            // axios.post(serverAddress+request, JSON.stringify(base64EncodedImage))
            await fetch(serverAddress.value+'/photo/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            console.log('45'+err);
        }
    };

 const submitFile = (e) => {
        if (!fileSelector.files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(fileSelector.files[0]);
        console.log('53'+reader)
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('reading error');
        };
    };

console.log(fileSelector)
fileSelector.addEventListener('change', ()=>{
    console.log('selected')
})
sendImage.addEventListener('click', ()=>{
    submitFile()
})