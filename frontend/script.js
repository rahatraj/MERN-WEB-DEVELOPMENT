function handleSubmit(event){
    event.preventDefault()
    const url = 'http://localhost:3030/contacts'
    const hrx = new XMLHttpRequest()
    hrx.open("POST",url,true)
    hrx.setRequestHeader('content-type', 'application/json')
    // hrx.send()
    hrx.onload = function(){
        if(hrx.readyState == 4){
            if(hrx.status === 200 || hrx.status === 201){
                var response = JSON.parse(hrx.responseText)
                console.log('success', response)
                alert('submitted sucessfully')
            }else{
                console.error('Error', hrx.status, hrx.statusText)
                alert('An error is occured while submitting the form')
            }
        }
    }; 

    var formData= {
        name : document.getElementById('name').value.trim(),
        email : document.getElementById('email').value.trim(),
        mobile : document.getElementById('mobile').value.trim(),
        message : document.getElementById('message').value.trim()
    }
    hrx.send(JSON.stringify(formData))
}


// for light and dark mode
const body = document.body;
const lightDark = document.getElementById('light-dark')
const container = document.querySelector('.container')
const submit = document.querySelector('#submit')

let isLightMode = true;

function applyLightMode() {
    body.style.backgroundColor = 'white'
    container.style.backgroundColor = '#B7E0FF'
    container.style.color = 'black'
    submit.style.backgroundColor = '#E78F81'
    submit.style.color = 'black'
    lightDark.style.backgroundColor = '#E78F81'
}

function applyDarkMode() {
    body.style.backgroundColor = '#212121'
    body.style.color = "white"
    container.style.backgroundColor = '#07070766'
    container.style.color = 'white'
    submit.style.backgroundColor = '#FF6500'
    submit.style.color = 'white'
    lightDark.style.backgroundColor = 'antiquewhite'
}
lightDark.addEventListener('click', () => {
    if(isLightMode){
        applyLightMode()
    }else{
        applyDarkMode()
    }
    isLightMode = !isLightMode;
})
