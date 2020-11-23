import 'phaser'
import * as localStorage from './localStorage'
const randomElement = (arr, start, end) => arr[Phaser.Math.Between(start, end)]

const checkZoneCount = (number) => {
    if(number < 0) return true;
    number--
    localStorage.saveItem('numberOfZones', number)
}

export { randomElement, checkZoneCount }