import 'phaser'
import * as localStorage from './localStorage'
const randomElement = (arr, start, end) => arr[Phaser.Math.Between(start, end)]

const reduceNumberOfZones = (number) => {
    number--
    localStorage.saveItem('numberOfZones', number)
    return number;
}
const checkZoneCount = (number) => {
    if(number <= 0) return true;
}

export { randomElement, checkZoneCount, reduceNumberOfZones }