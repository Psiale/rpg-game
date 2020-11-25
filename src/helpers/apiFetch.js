import 'regenerator-runtime';

const fetch = require('node-fetch');

const initGame = async () => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const title = JSON.stringify({
    name: 'an app for testing',
  });
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: title,
  };
  //
  const response = await fetch(baseUrl, data);
  const result = await response.json();
  //
  return result;
};
//
const topScore = (arr) => {
  try {
    return arr.sort((a, b) => b.score - a.score);
  } catch (error) {
    throw new Error('Not enough elements to sort');
  }
};

const sendRequest = async (method, urlParam, userName = '', userScore = '') => {
  let data;
  const apiKey = 'fs1NSfYm8b7oxDIVMn9Q';
  // const secondApiKey = '4wA4SBb49LWb3h1NCNaB'
  const request = JSON.stringify({
    user: userName,
    score: userScore,
  });

  const post = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: request,
  };

  const get = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  method === 'POST' ? data = post : data = get;

  try {
    const baseUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/${urlParam}`;

    const response = await fetch(baseUrl, data);
    const result = await response.json();
    return topScore(result.result);
  } catch (error) {
    throw new Error('there are not enough scores to sort');
  }
};

const topFive = async (
  fn,
  self,
  fn2,
  param1,
  param2,
  param3,
  param4,
  param5,
) => {
  try {
    if ((await sendRequest('GET', 'scores').length) === 0) {
      fn2(param1, param2, param3, param4, param5, self);
    }
    const arr = await sendRequest('GET', 'scores');
    for (let index = 0; index < 5; index++) {
      if (index >= arr.length) break;
      const element = await arr[index];
      fn(index, element, self);
    }
  } catch (error) {
    throw new Error('there are not enough elements to display a top 5');
  }
};

export { sendRequest, topFive, initGame };
