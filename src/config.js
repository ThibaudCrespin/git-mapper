class Config {
    constructor(ctx) {
        this.ctx = ctx;
        this.repository = {
            name: 'angular',
            owner: 'angular'
        };
        this.marker = {
            quantity: 10,
            precision: 0.3,
            size: 10,
            growth: 5,
            color: '#000000'
        };
        this.filename = 'canvas';
    }

    export() {
        let svgExport = this.ctx.getSerializedSvg();
        let filename = `${this.filename}.svg`;
    
        let pseudolink = document.createElement('a');
        pseudolink.setAttribute('href', 'data:image/svg+xml;charset=utf-8, ' + encodeURIComponent(svgExport));
        pseudolink.setAttribute('download', filename);
        pseudolink.style.display = 'none';
        document.body.appendChild(pseudolink);
        pseudolink.click();
        document.body.removeChild(pseudolink);
    }
}

export default Config;