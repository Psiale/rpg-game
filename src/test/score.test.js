import * as Score from '../helpers/score';
import * as localStorage from '../helpers/localStorage';


describe('it updates a score with the newPoints provides as parameter', () => {
  it('uploads a number to a localStorage reference', () => {
    Score.add(200);
    expect(localStorage.retrieveItem('score')).toEqual(200);
  });
});

describe('it should create a new score on the api', () => {
  it('uploads a score with the provided user name and user score', () => {
    expect(Score.updateUserAPIScore('JestTesting', 600)).toBe(true);
  });
});
