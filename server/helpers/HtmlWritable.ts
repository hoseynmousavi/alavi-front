import {Writable} from "stream"

class HtmlWritable extends Writable {
    chunks = []
    html = ""

    getHtml() {
        return this.html
    }

    override _write(chunk: any, encoding: any, callback: () => void) {
        // @ts-ignore
        this.chunks.push(chunk)
        callback()
    }

    override _final(callback: () => void) {
        this.html = Buffer.concat(this.chunks).toString()
        callback()
    }
}

export default HtmlWritable