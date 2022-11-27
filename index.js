const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

inputEl.value = null;
timerEl.innerHTML = '00:00:00';
let interval;

const createTimerAnimator = () => {
  
  return (seconds) => {

    const time = (seconds) => {

      const getZero = (num) => {
        if (num >= 0 && num < 10) { 
            return '0' + num;
          } else {
              return num;
          }
      }

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds / 60) - (hours * 60);
      const sec = Math.floor(seconds - hours * 3600 - minutes * 60);
    
      return `${getZero(hours)}:${getZero(minutes)}:${getZero(sec)}`;
    }

    const update = () => {
      if (seconds >= 0) {
        timerEl.innerHTML = `${time(seconds)}`;
        seconds--;
      }
    }

    const updateTimer = () => {    
      return () => {
        update();
      };
    }

    update();
    clearInterval(interval);
    interval = setInterval(updateTimer(), 1000);
  };
};

inputEl.addEventListener('input', () => {
  if (inputEl.value.match(/[^0-9]/g)) {
    inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
  };
});

const animateTimer = createTimerAnimator();

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});