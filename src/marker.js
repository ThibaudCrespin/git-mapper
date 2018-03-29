class Marker {
    constructor(canvas, location) {
        this.d = 10;
        this.x = (location.lng * canvas.width) / 360;
        this.y = (-location.lat * canvas.height) / 180;
    }

    remove() {
        this.d = this.x = this.y = 0;
    }

    compare(_marker) {
        return Math.sqrt(Math.pow(this.x - _marker.x, 2)+Math.pow(this.y - _marker.y, 2));
    }

    static get x() {
        return this.x;
    }

    static get y() {
        return this.y;
    }

    growSize() {
        // this.d += 0.1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.d, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

export default Marker;