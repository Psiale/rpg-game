import "regenerator-runtime";

const fetch = require("node-fetch");

// const initGame = async () => {
// const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/'
//   const title = JSON.stringify({
//     name: 'Cuttle Little Town',
//   });
//    const data = {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: title,
//   };

//   const response = await fetch(baseUrl, data);
//   const result = await response.json();

//   return result;
// };

const topScore = (arr) => arr.sort((a, b) => b.score - a.score);

const sendRequest = async (method, urlParam, userName = "", userScore = "") => {
  let data;
  const apiKey = "fs1NSfYm8b7oxDIVMn9Q";
  // const secondApiKey = '4wA4SBb49LWb3h1NCNaB'
  const request = JSON.stringify({
    user: userName,
    score: userScore,
  });

  const post = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: request,
  };

  const get = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  method === "POST" ? (data = post) : get;

  const baseUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/${urlParam}`;

  const response = await fetch(baseUrl, data);
  const result = await response.json();
  console.log(result);
  return topScore(result.result);
};

const topFive = async (fn, self, fn2, param1, param2, param3, param4, param5) => {
  if(await sendRequest('GET', 'scores').length == 0) {
    fn2(param1, param2, param3, param4, param5, self)
  }
  const arr = await sendRequest( "GET", "scores");
  for (let index = 0; index < 5; index++) {
    if(index >= arr.length) break
    const element = await arr[index];
    fn(index, element, self);
  }
};

export { sendRequest, topFive };
