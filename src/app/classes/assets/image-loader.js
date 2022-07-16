export class ImageLoader {
    static loadImage(path) {
        let image = new Image();

        image.src = path;

        image.onerror = () => {
            throw new Error(`Image not found at path ${path}`);
        }

        return image;
    }
}
