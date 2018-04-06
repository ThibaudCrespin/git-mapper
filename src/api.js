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

let request = (url) => {
    return new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `token ${API.github.key}`,
        }),
        mode: 'cors'
    });
}

export async function getRepoStars (owner, repo, quantity) {
    let response = await fetch(request(`${API.github.url}/repos/${owner}/${repo}/stargazers?per_page=${quantity}`));
    return response.json();
}

export async function getUser (user) {
    let response = await fetch(request(`${API.github.url}/users/${user}`));
    return response.json();
}

export async function getURL (url) {
    let response = await fetch(request(url));
    return response.json();
}

export async function getGeoloc (location) {
    let response = await fetch(`${API.google.url}?address=${location}&key=${API.google.key}`);
    return response.json();
}
