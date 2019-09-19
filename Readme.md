# html2jira

[![build status][1]][2] [![dependency status][3]][4] [![coverage report][9]][10] [![stability index][15]][16]

[![npm stats][13]][14]

[![browser support][5]][6]

  A simple HTML to Jira markdown

## Example

```js
let { HTML2Jira } = require("HTML2Jira")
const html = '<h1>hello</h1><p>this is my page </p><ol><li>first item</li><li>second item</li></ol>'
let converter = new HTML2Jira()
let res = this.toJira(html)

```

## Installation

`npm install html2jira`

## Contributors

 - Kenn Roberson
