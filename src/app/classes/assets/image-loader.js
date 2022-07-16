export class ImageLoader {
    static loadImage(path) {
        let image = new Image();

        image.src = path;

        if (!image) {
            throw new Error(`Image not found at path ${path}`);
        }

        return image;
    }
}
