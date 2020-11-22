import 'phaser'
const randomElement = (arr, start, end) => arr[Phaser.Math.Between(start, end)]

export { randomElement }