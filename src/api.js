const API = {
    github: {
        url: 'https://api.github.com',
        key: '1de997286d1b4cdf1a4a9a64486a5da398b6e41a'
    },
    google: {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        key: 'AIzaSyDFIHfs9c_NSbtoGfiCcOFXIy53e6tP2PQ'
    }
}

let request = (url) => {
    return new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `token ${API.github.key}`
        })
    });
}

export async function getRepoStars (owner, repo) {
    let response = await fetch(request(`${API.github.url}/repos/${owner}/${repo}/stargazers?per_page=20`));
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
