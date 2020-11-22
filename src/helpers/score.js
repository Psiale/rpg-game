import * as apiFetch from './apiFetch'

const add = (initScore, newPoints) => initScore += newPoints

const updateUserAPIScore = (hero, userName, score) => {
    console.log(`la vida del heroe es ${hero.hp}`)
    if(hero.hp === 0) { 
        console.log(apiFetch.sendRequest('GET', 'scores'))
        apiFetch.sendRequest('POST', 'scores', userName, score);
    
}
}

export {
    add, updateUserAPIScore,
}