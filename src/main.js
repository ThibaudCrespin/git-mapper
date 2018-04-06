import Marker from './marker';
import * as api from './api';
import './style.css';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;

let repo = 'angular';
let owner = 'angular';
let quantity = 10;

const markers = [];

const fetchLocation = (location) => {
	api.getGeoloc(location).then( res => {
		if(res.status === 'OK'){
			markers.push( new Marker(canvas, res.results[0].geometry.location) );
		}
	});
}

const fetchUser = (star) => {
	api.getURL(star.url).then( user => {
		if(user.location){
			fetchLocation(user.location);
		}
	});
}

ctx.translate(canvas.width/2, canvas.height/2);

const draw = () => {
    markers.forEach((m, i) => {
		/*if(i != 0){
			if(markers[i].compare(markers[i-1]) >= 5){
				markers[i-1].remove();
				m.growSize();
			}
		}*/
		m.draw(ctx);
	});

	requestAnimationFrame(draw);
};

const init =() => {
	api.getRepoStars(owner, repo, quantity).then( stars => {
		stars.forEach( star => {
			fetchUser(star);
		});
		draw();
	});
};
init();
