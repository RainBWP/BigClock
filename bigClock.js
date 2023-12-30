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


function changeAmPm() {
    _24format = !_24format
    updateTime()
}

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
                document.getElementById('hours').innerHTML = (miVariable === 0) ? 12 : miVariable

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


/* Wallpaper Engine Code */
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        

        /* Colors */
        if (properties.backgroundcoloruser) {
            var customColor = properties.backgroundcoloruser.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            backgroundColor = 'rgb(' + customColor + ')';
            document.documentElement.style.setProperty('--backgroundColor', 'rgb(' + customColor + ')');
        }
        if (properties.gradiantcolot) {
            var customColor = properties.gradiantcolot.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            secondaryColor = 'rgb(' + customColor + ')';
            document.documentElement.style.setProperty('--secondaryColor', 'rgb(' + customColor + ')');
        }
        if (properties.accentcoloruser) {
            var customColor = properties.accentcoloruser.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            accentColor = 'rgb(' + customColor + ')';
            document.documentElement.style.setProperty('--accentColor', 'rgb(' + customColor + ')');
        }
        if (properties.schemecolor) { // lets see
            var customColor = properties.schemecolor.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            primaryColor = 'rgb(' + customColor + ')';
            document.documentElement.style.setProperty('--primaryColor', 'rgb(' + customColor + ')');
        }

        /* text */
        if (properties.msguser) {
            const msg = properties.msguser.value;
            msgText = msg
            document.getElementById('notes_text').innerHTML = msgText
        }

        /* bools */
        if (properties._24hrsformatcheckbox) {
            _24format = properties._24hrsformatcheckbox.value;
            updateTime();
        }
        if (properties.musicchangecolors) {
            musicCode = properties.musicchangecolors.value;
        }
    },
};

function wallpaperMediaStatusListener(event) {
    musicEnabled = event.enabled
}
window.wallpaperRegisterMediaStatusListener(wallpaperMediaStatusListener);

function changeColors(color1,color2) {
    document.documentElement.style.setProperty('--primaryColor', color1);
    document.documentElement.style.setProperty('--secondaryColor', color2);
}

function notBrightOpaque(color) {

    const R = color.split('#')[1].substring(0,2)
    const G = color.split('#')[1].substring(2,4)
    const B = color.split('#')[1].substring(4,6)


    var RDecimal = parseInt(R,16)
    var GDecimal = parseInt(G,16)
    var BDecimal = parseInt(B,16)



    if (RDecimal < 32) {
        RDecimal = RDecimal + parseInt(RDecimal * 0.5 )+ 16;
    }
    if (RDecimal > 240) {
        RDecimal = RDecimal - parseInt(RDecimal * 0.1);
    }

    if (GDecimal < 32) {
        GDecimal= GDecimal + parseInt(GDecimal * 0.5)+ 16
    }
    if (GDecimal > 240) {
        GDecimal= GDecimal - parseInt(GDecimal * 0.1)
    }

    if (BDecimal < 32) {
        BDecimal= BDecimal + parseInt(BDecimal * 0.5)+ 16
    }
    if (RDecimal > 240) {
        BDecimal= BDecimal - parseInt(BDecimal * 0.1)
    }

    
    return `#${RDecimal.toString(16).padStart(2, '0')}${GDecimal.toString(16).padStart(2, '0')}${BDecimal.toString(16).padStart(2, '0')}`
}

function wallpaperMediaThumbnailListener(event) {

    musicColor1 = notBrightOpaque(event.primaryColor)
    musicColor2 = notBrightOpaque(notBrightOpaque(event.secondaryColor))
    /* document.getElementById('notes_text').innerHTML = `${musicColor1} - ${musicColor2}` */

    if (musicEnabled && musicCode && musicPlaying){
        changeColors(musicColor2 , musicColor1)
    }
}
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);

function wallpaperMediaPlaybackListener(event) {
    if (event.state == window.wallpaperMediaIntegration.PLAYBACK_STOPPED) {
        changeColors(primaryColor,secondaryColor)
        document.getElementById('notes_text').innerHTML = msgText
        musicPlaying = false;

    }
    if (event.state == window.wallpaperMediaIntegration.PLAYBACK_PAUSED) {
        changeColors(primaryColor,secondaryColor)
    }
    if (event.state == window.wallpaperMediaIntegration.PLAYBACK_PLAYING) {
        musicPlaying = true;
        changeColors(musicColor2 , musicColor1)
    }
}
window.wallpaperRegisterMediaPlaybackListener(wallpaperMediaPlaybackListener);

function getArtist(event) {
    return event.artist.split(',')[0] || event.albumArtist.split(',')[0];
}

function wallpaperMediaPropertiesListener(event) {
    if (musicCode && musicEnabled && musicPlaying) {
        const songTitle = event.title.split('(')[0]


        const artist = getArtist(event)

        document.getElementById('notes_text').innerHTML = `${songTitle} - ${artist}`
    }
}
window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
