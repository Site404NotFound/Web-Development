/*Author: James Hippler (ONID# 932807333)
Course: CS 290-400 Web Development
Homework Assignment: Activity: Fixing Closure Loop
Due: Sunday, October 22, 2017

Activity:
Fix Example 5 from this page so it alerts the 'correct' values. In addition feel
free to read the rest of the article if you are still confused about closures.
It is the one I usually refer to when I get confused on the issue.

Example 5:
This one is a real gotcha for many people, so you need to understand it. Be very
careful if you are defining a function within a loop: the local variables from the
closure do not act as you might first think.*/

// Got some insight and some help from the gang over at StackOverflow
// https://stackoverflow.com/questions/8230837/what-is-the-correct-way-to-fix-this-javascript-closure
function buildList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    (function(i) {
      var item = 'item ' + list[i];
      result.push(function(index) {
        console.log(item + ' : ' + list[i]);    // changed alert to console.log for testing in node.js
      });     // Added closure to inner function
    }(i));    // added closure
  }
  return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList ();
