enum ImageFormat {
  PNG = "png",
  JPEG = "jpeg",
}

interface IResolution {
  width: number;
  height: number;
}

interface IImageConversion extends IResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private formats: ImageFormat[] = [];
  private resolutions: IResolution[] = [];

  addPNG() {
    if (this.formats.includes(ImageFormat.PNG)) return this;
    this.formats.push(ImageFormat.PNG);
    return this;
  }

  addJPEG() {
    if (this.formats.includes(ImageFormat.JPEG)) return this;
    this.formats.push(ImageFormat.JPEG);
    return this;
  }

  addResolution(width: number, height: number) {
    this.resolutions.push({ width, height });
    return this;
  }

  build(): IImageConversion[] {
    const result: IImageConversion[] = [];
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

console.log(
  new ImageBuilder()
    .addJPEG()
    .addPNG()
    .addResolution(100, 100)
    .addResolution(200, 200)
    .addResolution(300, 500)
    .build()
);
