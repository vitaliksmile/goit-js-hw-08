import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const STORAGE_KEY = 'videoplayer-current-time';

const videoPlayer = document.querySelector('iframe');
const player = new Player(videoPlayer);

const onPlay = function ({ seconds }) {
  save(STORAGE_KEY, seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));
function setTimePlayer() {
  const savedData = load(STORAGE_KEY);
  if (!savedData) {
    return;
  }
  player.setCurrentTime(load(STORAGE_KEY));
}

// static
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

setTimePlayer();
