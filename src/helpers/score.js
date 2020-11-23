import * as apiFetch from "./apiFetch";
import * as localStorage from "../helpers/localStorage";

const add = (newPoints) => {
  let score;
  localStorage.retrieveItem("score")
    ? (score = localStorage.retrieveItem("score"))
    : (score = 0);
  score += newPoints;
  console.log(score);
  localStorage.saveItem("score", score);
};

const updateUserAPIScore = (hero, userName, score) => {
  console.log(`la vida del heroe es ${hero.hp}`);
  console.log(apiFetch.sendRequest("GET", "scores"));
  apiFetch.sendRequest("POST", "scores", userName, score);
};

export { add, updateUserAPIScore };
