import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const videoPlayer = document.querySelector('iframe');
const player = new Player(videoPlayer);
const STORAGE_KEY = 'videoplayer-current-time';

setCurrentTime();
player.on('timeupdate', throttle(onPlay, 1000));

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

function onPlay({ seconds }) {
  save(STORAGE_KEY, seconds);
}
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function setCurrentTime() {
  if (!load(STORAGE_KEY)) {
    return;
  }

  player.setCurrentTime(load(STORAGE_KEY));
}
