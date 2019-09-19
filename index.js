class HTML2Jira {
    constructor() {
    }

    toJira(html) {
        this.html = html;
        let parser = require('html-dom-parser');
        this.dom = parser(html)
        this.results = ''

        this.dom.forEach(element => {
            this._parse(element, 0, '')
        });
        return this.results
    }

    _parse(element, depth, carryOver) {
        switch (element.type) {
            case 'tag':
                this._parseTag(element, depth, carryOver)
                break
            case 'text':
                this._parseText(element, depth, carryOver)
                break
            default:
                console.log(element)
        }
    }

    _parseText(element, depth, carryOver) {
        // console.log(element)
        this.results += carryOver + element.data.trim()
        // console.log(element)
    }

    _parseTag(element, depth, carryOver) {
        let tag = ''
        let wrapped = false
        // let newCarryOver = ''
        switch (element.name) {
            case 'h1':
                tag = 'h1. '
                break
            case 'h2':
                tag = 'h2. '
                break
            case 'h3':
                tag = 'h3. '
                break
            case 'p':
                tag = ''
                break
            case 'i':
                tag = '_'
                wrapped = true
                break
            case 'b':
                tag = '*'
                wrapped = true
                break
            case 'ol':
                tag = ''
                carryOver = this.pad(depth, '#') + '#  '
                break
            case 'ul':
                carryOver = this.pad(depth, '*') + '*  '
                break
        }
        this.results += tag
        let preCRs = this.results.split('\n').length
        element.children.forEach(child => {
            this._parse(child, depth + 1, carryOver)
        })
        let postCRs = this.results.split('\n').length
        if (wrapped) {
            this.results += tag
        } else if(preCRs == postCRs) {
            this.results += '\n'
        }
    }

    pad(depth, spaces) {
        let rc = ''
        for (let i = 0; i < depth; i++) {
            rc += spaces
        }
        return rc
    }
}

module.exports = {
    HTML2Jira
}