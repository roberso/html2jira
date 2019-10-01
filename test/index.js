import {
  assert
} from 'chai';
import {
  HTML2Jira
} from '../src';

describe('HTML2Jira testing', () => {
  const h2j = new HTML2Jira();
  it('multiple h1s right next to each other', () => {
    const result = h2j.toJira('<h1>title</h1><h1>title</h1>');
    const expectedVal = 'h1. title\nh1. title\n';
    assert(result === expectedVal, 'multiple h1s failed');
  });
  it('simple image in a paragraph', () => {
    const result = h2j.toJira('<p>Groo <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Groo_cover_issue1.jpg/200px-Groo_cover_issue1.jpg" alt="Groo by Sergio Aragon" width="128" height="128"> the Wanderer!');
    const expectedVal = 'Groo !https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Groo_cover_issue1.jpg/200px-Groo_cover_issue1.jpg|alt="Groo by Sergio Aragon", width=128, height=128! the Wanderer!\n';
    assert(result === expectedVal, 'simple image failed');
  });
  it('simple hypertext link in a paragraph', () => {
    const result = h2j.toJira('<p>nice place to learn the basics of something is <a href="https://www.w3schools.com">W3Schools.com</a>.');
    const expectedVal = 'nice place to learn the basics of something is [W3Schools.com|https://www.w3schools.com].\n';
    assert(result === expectedVal, 'simple image failed');
  });
  it('proper break after end of a level 1 list', () => {
    const result = h2j.toJira('<ul><li>name and email address</li></ul><p>Some Code:</p>');
    const expectedVal = '* name and email address\n\nSome Code:\n';
    assert(result === expectedVal, 'simple list with proper break failed');
  });
  it('ckeditor nested lists converted', () => {
    const result = h2j.toJira('<ul><li>b1</li><li>b2<ol><li>b3</li><li>b4</li></ol></li><li>b5</li></ul>');
    const expectedVal = '* b1\n* b2\n## b3\n## b4\n* b5\n\n';
    assert(result === expectedVal, 'ckeditor nested lists converted');
  });
  it('Bullet+number list converted', () => {
    const result = h2j.toJira('<ol><li>t1</li><li>t2</li><ul><li>t2.1</li></ul></ol>');
    const expectedVal = '# t1\n# t2\n** t2.1\n\n';
    assert(result === expectedVal, 'Bullet+number list converted');
  });
  it('simple page converted', () => {
    const result = h2j.toJira('<h1>title</h1><p>hello</p><ul><li>b1</li><li>b2</li><ol><li>b3</li><li>b4</li></ol><li>b5</li></ul>');
    const expectedVal = 'h1. title\nhello\n* b1\n* b2\n## b3\n## b4\n* b5\n\n';
    assert(result === expectedVal, 'simple page converted');
  });
  it('Bold converted', () => {
    const result = h2j.toJira('<strong>hello</strong> <b>again</b>');
    const expectedVal = '*hello* *again*';
    assert(result === expectedVal, 'Bold converted');
  });
  it('Italics converted', () => {
    const result = h2j.toJira('<i>hello</i>');
    const expectedVal = '_hello_';
    assert(result === expectedVal, 'Italics converted');
  });
  it('Bold+Italic converted', () => {
    const result = h2j.toJira('<b><i>hello</i></b>');
    const expectedVal = '*_hello_*';
    assert(result === expectedVal, 'Bold+Italic converted');
  });
  it('header 1 converted', () => {
    const result = h2j.toJira('<h1>header 1</h1>');
    const expectedVal = 'h1. header 1\n';
    assert(result === expectedVal, 'header 1 converted');
  });
});
