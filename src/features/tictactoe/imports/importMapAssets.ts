import TokenType from '../types/TokenType';

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

export default async function importMapAssets() {

    const imageImports: Record<TokenType | 'fullCellFrame', { name: string, image: HTMLImageElement}> = {} as Record<TokenType | 'fullCellFrame', { name: string, image: HTMLImageElement}>;
    const promiseArray: Promise<any>[] = [];

    promiseArray.push(
        import('./../media/images/full-cell-frame.png')
        .then((data) => loadImage(data.default))
        .then(image => imageImports.fullCellFrame = { name: 'full-cell-frame', image: image }),

        import('./../media/images/wooden-ring.png')
        .then((data) => loadImage(data.default))
        .then(image => imageImports.ring = { name: 'wooden-ring', image: image }),

        import('./../media/images/wooden-triangle.png')
        .then((data) => loadImage(data.default))
        .then(image => imageImports.triangle = { name: 'wooden-triangle', image: image }),

        import('./../media/images/wooden-x.png')
        .then((data) => loadImage(data.default))
        .then(image => imageImports.x = { name: 'wooden-x', image: image }),

        import('./../media/images/wooden-bipyramid.png')
        .then((data) => loadImage(data.default))
        .then(image => imageImports.bipyramid = { name: 'wooden-bipyramid', image: image }),
        );

    await Promise.all(promiseArray);

    return imageImports;
}
