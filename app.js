const
    startValue = [],
    root = document.documentElement,
    time_div = document.querySelector('.time'),
    plus_div = document.querySelector('.plus'),
    minus_div = document.querySelector('.minus'),
    play_div = document.querySelector('.play'),
    pause_div = document.querySelector('.pause'),
    reset_div = document.querySelector('.reset'),
    button25_div = document.querySelector('.button25'),
    button50_div = document.querySelector('.button50'),
    progress_div = document.querySelector('.progress'),
    session_summary_div = document.querySelector('.session-summary'),
    focus_text_div = document.getElementById('focus'),
    break_text_div = document.getElementById('break'),
    long_break_text_div = document.getElementById('long-break');

    button25_div.addEventListener('click', e => {
        if (startValue.length === 0) {
        time_div.innerHTML = '25:00';
        focus_text_div.innerHTML = '25';
        break_text_div.innerHTML = '5';
        long_break_text_div.innerHTML = '15';
        clearInterval(timer);
        }
    })

    button50_div.addEventListener('click', e => {
        if (startValue.length === 0) {
        time_div.innerHTML = '50:00';
        focus_text_div.innerHTML = '50';
        break_text_div.innerHTML = '15';
        long_break_text_div.innerHTML = '30';
        clearInterval(timer);
        }
    })

    plus_div.addEventListener('click', e => {
        if (parseFloat(time_div.textContent) > 48) {
            focus_text_div.innerHTML = '50';
            break_text_div.innerHTML = '15';
            long_break_text_div.innerHTML = '30';
        } 
        if (startValue.length !== 0) {
            return true;
        }
        if (parseFloat(time_div.textContent) > 8) {
            time_div.innerHTML = (parseFloat(time_div.textContent) + 1) + ':' + time_div.textContent.slice(3);
        } else {
            time_div.innerHTML = '0' + (parseFloat(time_div.textContent) + 1) + ':' + time_div.textContent.slice(3);
        }
        startValue = time_div.textContent;
    })

    minus_div.addEventListener('click', e => {
        if (parseFloat(time_div.textContent) < 51) {
            focus_text_div.innerHTML = '25';
            break_text_div.innerHTML = '5';
            long_break_text_div.innerHTML = '15';
        } 
        
        if (startValue.length !== 0) {
            return true;
        }
        if (parseFloat(time_div.textContent) > 10) {
            time_div.innerHTML = (parseFloat(time_div.textContent) - 1) + ':' + time_div.textContent.slice(3);
        } else if (parseFloat(time_div.textContent) > 1) {
            time_div.innerHTML = '0' + (parseFloat(time_div.textContent) - 1) + ':' + time_div.textContent.slice(3);
        }
        startValue = time_div.textContent;
    })

    var timer;

    play_div.addEventListener('click', e => {
        if ( timer === 0 || timer === undefined) {
        timer = setInterval('time()',1000);}
        startValue.push(time_div.textContent);
        root.style.setProperty('--time',`${parseFloat(startValue[0].split(':')[0])*60 + 's'}`);
        root.style.setProperty('--width', '100%');
        root.style.setProperty('--playstate', 'running');
    })

    pause_div.addEventListener('click', e => {
        if (startValue.length !== 0) {
        clearInterval(timer);
        timer = 0;
        root.style.setProperty('--playstate', 'paused');
        }
    })

    reset_div.addEventListener('click', e => {
        if(startValue.length > 0){
            clearInterval(timer);
            timer = 0;
            time_div.innerHTML = startValue[0];
            startValue.length = 0;
            root.style.setProperty('--playstate', 'paused');
            root.style.setProperty('--width', '0%');
            root.style.setProperty('--time','0s');
        }
    })

    let i = 1;
    let session = 0;

    function Break() {
        var startValueNumber = parseFloat(startValue[0].split(':')[0]);
        if (startValueNumber < 50 && i === 1) {
            time_div.innerHTML = '05:00';
            i += 1;
            return true;
        }
        if (startValueNumber >= 50 && i === 1) {
            time_div.innerHTML = '15:00';
            i += 1;
            return true;
        }
        if (startValueNumber < 50 && i === 2) {
            time_div.innerHTML = startValue[0];
            i+=1;
            session += 1;
            session_summary_div.innerHTML = session;
            return true;
        }
        if (startValueNumber >= 50 && i === 2) {
            time_div.innerHTML = startValue[0];
            i+=1;
            session += 1;
            session_summary_div.innerHTML = session;
            return true;
        }
        if (startValueNumber < 50 && i === 3) {
            time_div.innerHTML = '15:00';
            i = 1;
            return true;
        }
        if (startValueNumber >= 50 && i === 3) {
            time_div.innerHTML = '30:00';
            i = 1;
            return true;
        }
    }

    function time() {
        var seconds = parseFloat(time_div.textContent.slice(3));
        var minutes = parseFloat(time_div.textContent);
        if(seconds === 0 && minutes > 10)  {
            time_div.innerHTML = (minutes-1) + ':' + `${seconds=59}`;
            return true;
        }
        if(seconds > 10 && minutes >= 10) {
            time_div.innerHTML = minutes + ':' + (seconds -1);
            return true;
        }
        if(seconds > 0 && minutes >= 10) {
            time_div.innerHTML = minutes + ':0' + (seconds -1);
            return true;
        }
        if(minutes < 11 && minutes !==0 && seconds === 0) {
            time_div.innerHTML = `0${minutes-1}` + ':' + `${seconds=59}`;
            return true;
        }
        if(minutes < 10 && seconds>10) {
            time_div.innerHTML = `0${minutes}` + ':' + (seconds -1);
            return true;
        }
        if(minutes < 10 && seconds > 0) {
            time_div.innerHTML = `0${minutes}` + ':0' + (seconds -1);
            return true;
        } if(minutes === 0 && seconds === 0) {
            Break();
            return true;
        }
    }

    
