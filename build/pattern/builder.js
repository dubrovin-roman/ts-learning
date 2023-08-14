"use strict";
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["PNG"] = "png";
    ImageFormat["JPEG"] = "jpeg";
})(ImageFormat || (ImageFormat = {}));
class ImageBuilder {
    constructor() {
        this.formats = [];
        this.resolutions = [];
    }
    addPNG() {
        if (this.formats.includes(ImageFormat.PNG))
            return this;
        this.formats.push(ImageFormat.PNG);
        return this;
    }
    addJPEG() {
        if (this.formats.includes(ImageFormat.JPEG))
            return this;
        this.formats.push(ImageFormat.JPEG);
        return this;
    }
    addResolution(width, height) {
        this.resolutions.push({ width, height });
        return this;
    }
    build() {
        const result = [];
        for (let f of this.formats) {
            for (let r of this.resolutions) {
                result.push({
                    format: f,
                    width: r.width,
                    height: r.height,
                });
            }
        }
        return result;
    }
}
console.log(new ImageBuilder()
    .addJPEG()
    .addPNG()
    .addResolution(100, 100)
    .addResolution(200, 200)
    .addResolution(300, 500)
    .build());
