const fetch = require('node-fetch');


const apiKey = 'c1MEnlntwBhawxFFqK9g'

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

const sendRequest = async (apiKey, method, urlParam, userName = '', userScore = '') => {
  let data;
  
    const request = JSON.stringify({
    user: userName,
    score: userScore,
  });
  
  const post = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: request,
  };
  
  const get = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  
  (method === 'POST') ? data = post  : get
   
   
  const baseUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/${urlParam}` 
  
  
    const response = await fetch(baseUrl, data);
  const result = await response.json();
  
  return result.result
}
