import * as ApiFetch from '../helpers/apiFetch'

describe('Initialize a new game ', () => {
    const expectedResponse = [
        expect.stringMatching(/^Game/)
    ]
    it('should return a message with an ID', () => {
        ApiFetch.initGame().then(response => {
            expect(response.result).toContain('Game')
        })
    })
})

describe('It uploads an user an his score', () => {
    it('returns a message of success when the score gets uploaded', () => {
       ApiFetch.sendRequest('POST', 'scores', 'Test', 20).then( response => {
           expect(response).toContain('Leaderboard')
       })
    })
})

describe('API GET request', () => {
    it('returns an array of scores', () => {
       ApiFetch.sendRequest('GET', 'scores',).then( response => {
           expect(typeof response).toBe('object')
       })
    })
})