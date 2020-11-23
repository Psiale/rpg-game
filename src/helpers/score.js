import * as apiFetch from "./apiFetch";
import * as localStorage from "../helpers/localStorage";

const add = (newPoints) => {
  let score;
  localStorage.retrieveItem("score")
    ? (score = localStorage.retrieveItem("score"))
    : (score = 0);
  score += newPoints;
  localStorage.saveItem("score", score);
};

const updateUserAPIScore = (userName, score) => {
  apiFetch.sendRequest("POST", "scores", userName, score);
  return true;
};

export { add, updateUserAPIScore };
