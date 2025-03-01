function getImageFullUrl({src}: { src: string }) {
    return process.env.PUBLIC_URL + src
}

export default getImageFullUrl