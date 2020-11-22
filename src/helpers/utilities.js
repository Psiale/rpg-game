import 'phaser'
const randomElement = (arr, start, end) => arr[Phaser.Math.Between(start, end)]

const checkZoneCount = (length) => {
    if(length < 0) return true;
}

export { randomElement, checkZoneCount }