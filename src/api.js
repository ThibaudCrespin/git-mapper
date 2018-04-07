const API = {
    github: {
        url: 'https://api.github.com',
        key: process.env.GITHUB_API_KEY
    },
    google: {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        key: process.env.GMAPS_API_KEY
    }
}

/**
 * @param {String} url - URL to be requested
 * @returns {Request}
*/
let request = (url) => {
    return new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `token ${API.github.key}`,
        }),
        mode: 'cors'
    });
}

/**
 * @param {String} owner - owner of the requested repository
 * @param {String} repo - name of the requested repository
 * @param {String} quantity - quantity of results requested
 * @returns {Promise<any>}
*/
export async function getRepoStars (owner, repo, quantity) {
    let response = await fetch(request(`${API.github.url}/repos/${owner}/${repo}/stargazers?per_page=${quantity}`));
    return response.json();
}

/**
 * @param {String} user - user requested
 * @returns {Promise<any>}
*/
export async function getUser (user) {
    let response = await fetch(request(`${API.github.url}/users/${user}`));
    return response.json();
}

/**
 * @param {String} url - url requested
 * @returns {Promise<any>}
*/
export async function getURL (url) {
    let response = await fetch(request(url));
    return response.json();
}

/**
 * @param {String} location - location address requested
 * @returns {Promise<any>}
*/
export async function getGeoloc (location) {
    let response = await fetch(`${API.google.url}?address=${location}&key=${API.google.key}`);
    return response.json();
}
