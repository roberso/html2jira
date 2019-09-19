var test = require("tape")

var {HTML2Jira} = require("../index.js")

test("Bullet+number list converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<ol><li>t1</li><li>t2</li><ul><li>t2.1</li></ul></ol>')
    assert.equal(result, "# t1\n# t2\n** t2.1\n")
    assert.end()
})

test("simple page converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<h1>title</h1><p>hello</p><ul><li>b1</li><li>b2</li><ol><li>b3</li><li>b4</li></ol><li>b5</li></ul>')
    assert.equal(result, "h1. title\nhello\n* b1\n* b2\n## b3\n## b4\n* b5\n")
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

