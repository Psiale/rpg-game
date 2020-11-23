import "phaser";
import * as ApiFetch from  '../helpers/apiFetch'
import * as Utilities from '../helpers/utilities'


export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super("Scores");
  }

  init() {
    this.scores = ApiFetch.sendRequest('GET', 'scores');      
  }

  create() {
    this.creditsText = this.add.text(0, 0, "Top Score", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.zone = this.add.zone(
      322.5,
      360,
      645,
      720
    );

    ApiFetch.topFive(Utilities.displayTextScore, this, Utilities.displayCustomText, 'No scores available', 222.5,360, "35px", "#952aec")

    Phaser.Display.Align.In.TopCenter(this.creditsText, this.zone, 0, -20);

    // Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    // this.madeByText.setY(1000);


  }
}
