let _24format = false;
let musicEnabled = true;
let musicCode = true;
let musicPlaying = false;

let accentColor = '#fff';
let primaryColor = '#93aaee';
let secondaryColor = '#211f3c';
let backgroundColor = '#000';

let musicColor1 = '#eee'
let musicColor2 = '#eee'

let msgText = 'Anything can be here';




const numDays = {0:'Sun',
            1:'Mon',
            2:'Tue',
            3:'Wed',
            4:'Thu',
            5:'Fri',
            6:'Sat'}

function updateValue(elementChanged, elementVisualizer) {
    const input = document.getElementById(elementChanged);
    const output = document.getElementById(elementVisualizer);

    output.innerHTML = `Value: ${input.value}`
    
}

function getActualTime(elementId){
    const date = new Date();
    document.getElementById(elementId).innerHTML = `${addZeros(date.getHours())}:${addZeros(date.getMinutes())}`;
    console.log(Date())
}

function addZeros(number) {
    // adds an zero before a number between 0-9
    return number.toString().padStart(2, '0')
}
// document.getElementById('time_end').innerText = minutes + ':' + seconds.toString().padStart(2, '0');

function updateTime(){
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()

    document.getElementById('minutes').innerHTML = addZeros(minutes)
    document.getElementById('weekDay').innerHTML = numDays[date.getDay()];
    document.getElementById('numDay').innerHTML = date.getDate();

    if (_24format) {
        document.getElementById('_12hrsFormat').classList.add('oculto')
        document.getElementById('hours').innerHTML = hours;
    }else{
        document.getElementById('_12hrsFormat').classList.remove('oculto');
        if (hours>12) {
            document.getElementById('am').innerHTML = 'PM'
            
            document.getElementById('hours').innerHTML = hours-12
        }else{
            document.getElementById('am').innerHTML = 'AM'
            if (hours === 0) {
                document.getElementById('hours').innerHTML = 12
            } else{
                document.getElementById('hours').innerHTML = hours

            }
        }
    }
    
}


function initClock() {
    updateTime()
    nextUpdate()
}
function nextUpdate() {
    const date = new Date();
    const deltaTime = (60 - date.getSeconds())*1000;
    setTimeout(initClock, deltaTime);
}

setTimeout(initClock, 100)


/* Web Functions */

function changeAmPm() {
    _24format = !_24format
    updateTime()
    localStorage.setItem('_24format', _24format)
}

function changeColor(colorid,tochangeid) {
    const color = document.getElementById(colorid).value
    document.documentElement.style.setProperty(tochangeid, color);
    localStorage.setItem(tochangeid,color)
}

function showMe() {
    document.getElementById('testE').style.opacity = 1
    localStorage.setItem('hideMe',1);
    setTimeout(()=>{
        document.getElementById('tohide').onclick = hideMe;
    },100)
    

}

function hideMe(){
    document.getElementById('testE').style.opacity = 0;
    localStorage.setItem('hideMe',0);
    setTimeout(()=>{
        document.getElementById('tohide').onclick = showMe;
    },100)
    

}

setTimeout(()=>{
    try {
        _24format = localStorage.getItem('_24format')
        console.log(localStorage.getItem('hideMe'))
        document.getElementById('testE').style.opacity = localStorage.getItem('hideMe')
        document.documentElement.style.setProperty('--primaryColor', localStorage.getItem('--primaryColor'))
        document.documentElement.style.setProperty('--secondaryColor', localStorage.getItem('--secondaryColor'))
        document.documentElement.style.setProperty('--accentColor', localStorage.getItem('--accentColor'))
        document.documentElement.style.setProperty('--backgroundColor', localStorage.getItem('--backgroundColor'))
        updateTime()
    } catch (error) {
        console.error(error)
    }
    
},100)
