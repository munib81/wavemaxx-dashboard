// sound.js
import { Howl } from 'howler';

const notificationSound = new Howl({
  src: ['./sound/submit.mp3'],
  volume: 0.75, // Adjust the volume as needed
});

export const playNotificationSound = () => {
  notificationSound.play();
};
