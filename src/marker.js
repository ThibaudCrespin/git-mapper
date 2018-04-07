class Marker {

    /**
     *  @param {Number} width - object width
     *  @param {Number} heigth - object heigth
     *  @param {any[]} location - location object of marker
    */
    constructor(width, height, location) {
        this.d = 5;
        this.x = (location.lng * width) / 360;
        this.y = (-location.lat * height) / 180;
    }

    remove() {
        this.d = this.x = this.y = 0;
    }

    /**
     *  @param _marker - marker object
    */
    distance(_marker) {
        return Math.sqrt(Math.pow(this.x - _marker.x, 2)+Math.pow(this.y - _marker.y, 2));
    }

    static get x() {
        return this.x;
    }

    static get y() {
        return this.y;
    }

    static get d() {
        return this.d;
    }

    growSize() {
        this.d += 5;
    }

    /**
     * @param ctx - Context of canvas
    */
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.d, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

export default Marker;