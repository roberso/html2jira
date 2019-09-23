class HTML2Jira {
    constructor() {}

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
        this.results += carryOver + element.data
        // console.log(element)
    }

    _parseTag(element, depth, carryOver) {
        let tag = ''
        let wrapped = false
        let newDepth = depth
        let tagId = element.name.toLowerCase()
        let skipChildren = false
        let skipLineBreak = false
        // let newCarryOver = ''
        switch (tagId) {
            case 'h1':
                tag = 'h1. '
                break
            case 'h2':
                tag = 'h2. '
                break
            case 'h3':
                tag = 'h3. '
                break
            case 'h4':
                tag = 'h4. '
                break
            case 'h5':
                tag = 'h5. '
                break
            case 'h6':
                tag = 'h6. '
                break
            case 'p':
                tag = ''
                break
            case 'i':
                tag = '_'
                wrapped = true
                break
            case 'u':
                tag = '+'
                wrapped = true
                break
            case 'img':
                tag = this._processImage(element)
                skipLineBreak = true
                skipChildren = true
                break
            case 'b':
            case 'strong':
                tag = '*'
                wrapped = true
                break
            case 'ol':
                tag = this._needNewLine(element)
                carryOver = this._pad(depth, '#') + ' '
                break
            case 'ul':
                tag = this._needNewLine(element)
                carryOver = this._pad(depth, '*') + ' '
                break
            case 'li':
                newDepth = depth - 1
                break
            case 'br':
                tag = '\n'
                break
            case 'hr':
                tag = '----\n'
                break
            case 'a':
                tag = this._processAnchor(element)
                skipChildren = true
                skipLineBreak = true
                break
            // case 'table':
            //     tag = this._processTable(element)
            //     skipChildren = true
            //     skipLineBreak = true
            //     break
        }
        this.results += tag
        let preCRs = this.results.split('\n').length
        if (!skipChildren) {
            element.children.forEach(child => {
                this._parse(child, newDepth + 1, carryOver)
            })
        }
        let postCRs = this.results.split('\n').length
        if (wrapped) {
            this.results += tag
        } else if (preCRs == postCRs) {
            if (!skipLineBreak) {
                this.results += '\n'
            }
        }
        if (depth == 0) {
            if ((tagId == 'ol') || (tagId == 'ul')) {
                this.results += '\n'
            }
        }
    }

    _processTable(element) {

    }

    _processImage(element) {
        let src = element.attribs.src
        let attribs = ''
        for (let k in element.attribs) {
            let d = element.attribs[k]
            switch (k.toLowerCase()) {
                case "src":
                    src = d
                    break
                default:
                    let space = attribs.length > 0 ? ', ' : ''
                    if (k == 'alt') {
                        d = `"${d}"`
                    }
                    attribs += `${space}${k}=${d}`
                    break
            }
        }
        let vbar = attribs.length == 0 ? '' : '|'
        return `!${src}${vbar}${attribs}!`
    }

    _processAnchor(element) {
        let href = element.attribs.href
        let label = ''
        element.children.forEach(child => {
            label += this._extractText(child)
        })
        if (label.trim().length == 0) {
            label = href
        }
        return `[${label}|${href}]`
    }

    _extractText(element) {
        let rc = ''
        if (element.type == 'text') {
            rc = element.data
        }
        return rc
    }

    _needNewLine(element) {
        let rc = ''
        let parent = element.parent
        if (parent && (parent.type == 'tag') && (parent.name.toLowerCase() == 'li')) {
            let firstList = null
            parent.children.forEach(child => {
                if ((firstList == null) && (child.type == 'tag')) {
                    if ((child.name.toLowerCase() == 'ol') || (child.name.toLowerCase() == 'ul')) {
                        firstList = child
                    }
                }
            })
            if (firstList == element) {
                rc = '\n'
            }
        }
        return rc
    }

    _pad(depth, spaces) {
        let rc = ''
        for (let i = 0; i < depth + 1; i++) {
            rc += spaces
        }
        return rc
    }
}

module.exports = {
    HTML2Jira
}