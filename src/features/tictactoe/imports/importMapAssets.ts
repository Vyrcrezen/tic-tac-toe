import TokenType from '../types/TokenType';

function loadImage(src: string): Promise<{ src: string, img: HTMLImageElement}> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve({ src, img: image });
        image.onerror = reject;
        image.src = src;
    });
}

export default async function importMapAssets() {

    const imageImports: Record<TokenType | 'fullCellFrame', { name: string, src: string, image: HTMLImageElement}> = {} as Record<TokenType | 'fullCellFrame', { name: string, src: string, image: HTMLImageElement}>;
    const promiseArray: Promise<any>[] = [];

    promiseArray.push(
        import('./../media/images/full-cell-frame.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.fullCellFrame = { name: 'full-cell-frame', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-ring.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.ring = { name: 'wooden-ring', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-triangle.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.triangle = { name: 'wooden-triangle', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-x.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.x = { name: 'wooden-x', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-bipyramid.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.bipyramid = { name: 'wooden-bipyramid', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-square.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.square = { name: 'wooden-square', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-coin.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.coin = { name: 'wooden-coin', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-star.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.star = { name: 'wooden-star', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-pentagon.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.pentagon = { name: 'wooden-pentagon', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-hexagon.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.hexagon = { name: 'wooden-hexagon', src: imageData.src, image: imageData.img }),

        import('./../media/images/wooden-heart.png')
        .then((data) => loadImage(data.default))
        .then(imageData => imageImports.heart = { name: 'wooden-heart', src: imageData.src, image: imageData.img }),
        );

    await Promise.all(promiseArray);

    return imageImports;
}
