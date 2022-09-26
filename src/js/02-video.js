import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const videoPlayer = document.querySelector('iframe');
const player = new Player(videoPlayer);
// const onPlay = function (data) {
//   // data is an object containing properties specific to that event
// };

const onPlay = function ({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
