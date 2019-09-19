var test = require("tape")

var {HTML2Jira} = require("../index.js")

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

test("Bullet+number list converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<ol><li>t1</li><li>t2</li><ul><li>t2.1</li></ul></ol>')
    assert.equal(result, "#  t1\n#  t2\n**  t2.1\n")
    assert.end()
})

test("header 1 converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<h1>header 1</h1>')
    assert.equal(result, "h1. header 1\n")
    assert.end()
})


test("simple page converted", function (assert) {
    let h2j = new HTML2Jira();
    let result = h2j.toJira('<h1>hello</h1><p>this is my page</p> <ol><li>first item</li><li>second item</li></ol>')
    assert.equal(result, "h1. hello\nthis is my page\n#  first item\n#  second item\n")
    assert.end()
})