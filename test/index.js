var test = require("tape")

var {HTML2Jira} = require("../index.js")

test("simple image in a paragraph", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<p>Groo <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Groo_cover_issue1.jpg/200px-Groo_cover_issue1.jpg" alt="Groo by Sergio Aragon" width="128" height="128"> the Wanderer!')
    assert.equal(result, 'Groo !https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Groo_cover_issue1.jpg/200px-Groo_cover_issue1.jpg|alt="Groo by Sergio Aragon", width=128, height=128! the Wanderer!\n')
    assert.end()
})

test("simple anchor link in a paragraph", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<p>nice place to learn the basics of something is <a href="https://www.w3schools.com">W3Schools.com</a>.')
    assert.equal(result, "nice place to learn the basics of something is [W3Schools.com|https://www.w3schools.com].\n")
    assert.end()
})

test("proper break after end of a level 1 list", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<ul><li>name and email address</li></ul><p>Some Code:</p>')
    assert.equal(result, "* name and email address\n\nSome Code:\n")
    assert.end()
})

test("ckeditor nested lists converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<ul><li>b1</li><li>b2<ol><li>b3</li><li>b4</li></ol></li><li>b5</li></ul>')
    assert.equal(result, "* b1\n* b2\n## b3\n## b4\n* b5\n\n")
    assert.end()
})

test("Bullet+number list converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<ol><li>t1</li><li>t2</li><ul><li>t2.1</li></ul></ol>')
    assert.equal(result, "# t1\n# t2\n** t2.1\n\n")
    assert.end()
})

test("simple page converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<h1>title</h1><p>hello</p><ul><li>b1</li><li>b2</li><ol><li>b3</li><li>b4</li></ol><li>b5</li></ul>')
    assert.equal(result, "h1. title\nhello\n* b1\n* b2\n## b3\n## b4\n* b5\n\n")
    assert.end()
})

test("Bold converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<b>hello</b>')
    assert.equal(result, "*hello*")
    assert.end()
})

test("Italic converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<i>hello</i>')
    assert.equal(result, "_hello_")
    assert.end()
})

test("Bold+Italic converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<b><i>hello</i></b>')
    assert.equal(result, "*_hello_*")
    assert.end()
})

test("header 1 converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<h1>header 1</h1>')
    assert.equal(result, "h1. header 1\n")
    assert.end()
})

