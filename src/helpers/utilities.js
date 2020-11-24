import 'phaser';
import * as localStorage from './localStorage';

const randomElement = (arr, start, end) => arr[Phaser.Math.Between(start, end)];

const reduceNumberOfZones = (number) => {
  number--;
  localStorage.saveItem('numberOfZones', number);
  return number;
};
const checkZoneCount = (number) => {
  if (number <= 0) return true;
};

const displayTextScore = (index, result, self) => {
  self.add.text(
    170,
    (index + 1) * 100,
    `${index + 1}. ${result.user}: ${result.score}`,
    {
      fontSize: '32px',
      fill: '#FDF498',
    },
  );
};

const displayCustomText = (textContent, x, y, fonS, color, self) => {
  self.add.text(x, y, textContent, {
    fontSize: fonS,
    fill: color,
  });
};

export {
  randomElement,
  checkZoneCount,
  reduceNumberOfZones,
  displayTextScore,
  displayCustomText,
};
