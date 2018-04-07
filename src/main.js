import Marker from './marker';
import * as api from './api';
import './style.css';

import * as _ from 'lodash';
import dat from 'dat.gui';
import C2S from 'canvas2svg';

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
		let tmp = _.find(markers, n => {return m.distance(n) < 30;});
		tmp.growSize();
		tmp.draw(ctx);
		if(!(tmp.d > 10)){
			m.draw(ctx);
		}
	});
};

const init =() => {
	api.getRepoStars(owner, repo, quantity).then( stars => {
		stars.forEach( star => {
			fetchUser(star);
		});
		setTimeout(draw, 3000);
	});
};
init();
