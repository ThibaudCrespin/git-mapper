import Marker from './marker';
import * as api from './api';
import './style.css';

import * as _ from 'lodash';
import dat from 'dat.gui';
import C2S from 'canvas2svg';

const W = 1200;
const H = 800;

const ctx = new C2S(W, H);
let svg;

let precision = 30;

let params = {
	repo : 'angular',
	owner : 'angular',
	quantity : 10
}

let markers = [];

const fetchLocation = (location) => {
	api.getGeoloc(location).then( res => {
		if(res.status === 'OK'){
			markers.push( new Marker(W, H, res.results[0].geometry.location) );
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

ctx.translate(W/2, H/2);

const draw = () => {
    markers.forEach((m, i) => {
		let tmp = _.find(markers, n => {return m.distance(n) < precision;});
		tmp.growSize();
		tmp.draw(ctx);
		if(tmp.d > 10){
			precision += 2;
		} else {
			m.draw(ctx);
		}
	});
};

const init =() => {
	ctx.clearRect(-W, -H, W*2, H*2);
	api.getRepoStars(params.owner, params.repo, params.quantity).then( stars => {
		markers = [];
		stars.forEach( star => {
			fetchUser(star);
		});
		setTimeout(draw, 3000);
		svg = ctx.getSvg();
		document.querySelector('body').appendChild(svg);
	});
};
init();

const gui = new dat.GUI();
gui.add(params, 'owner').onChange(newValue => {
	params.owner = newValue;
	init();
	
})
gui.add(params, 'repo').onChange(newValue => {
	params.repo = newValue;
	init();
})
gui.add(params, 'quantity', 1, 500, 10).onChange(newValue => {
	params.quantity = newValue;
	init();
})



document.querySelector('#export').addEventListener('click', () => {
  let svgExport = ctx.getSerializedSvg();
  let filename = 'canvas.svg';

  let pseudolink = document.createElement('a');
  pseudolink.setAttribute('href', 'data:image/svg+xml;charset=utf-8, ' + encodeURIComponent(svgExport));
  pseudolink.setAttribute('download', filename);
  pseudolink.style.display = 'none';
  document.body.appendChild(pseudolink);
  pseudolink.click();
  document.body.removeChild(pseudolink);
});
