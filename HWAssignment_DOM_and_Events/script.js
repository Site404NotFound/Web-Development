// Author: James Hippler (ONID# 932807333)
// Course: CS 290-400 Web Development
// Homework Assignment: DOM and Events
// Due: Sunday, October 29, 2017

// https://stackoverflow.com/questions/14643617/create-table-using-javascript

 // Select the body object from the DOM
var body = document.querySelector('body');
// Function ikeaTable to create the Head and Body of the table
ikeaTable ();   // Ikea because some assembly required.  Get it? Ha ha, right?
buttonGenerator (); // Call the button generator function to create buttons
var currentCell = document.querySelector('td');
selectCell();
var up = document.getElementById('Up');         // create a variable containing the Up button object
var down = document.getElementById('Down');     // create a variable containing the Down button object
var left = document.getElementById('Left');     // create a variable containing the Left button object
var right = document.getElementById('Right');   // create a variable containing the Right button object
var mark = document.getElementById('Mark Cell');// create a variable containing the Mark Cell button object

// Functionality for the up button
up.addEventListener('click', function() {     // Add event listener for when the button is clicked
  var cellDetails = document.getElementById("selected");
  var currentCol = cellDetails.className;
  var currentRow = cellDetails.parentNode.className;
  var table = document.getElementsByTagName('table');

  currentRow = Number(currentRow);
  currentCol = Number (currentCol);
  currentRow --;
  // Control to provent selecting an item outside the table
  if (document.getElementsByTagName('tr')[currentRow] === undefined) {
    return;
  } else {
    var downRow = document.getElementsByTagName('tr')[currentRow];
    nextCell = downRow.childNodes[currentCol];
    resetCell();
    currentCell.removeAttribute('id');
    currentCell = nextCell;
    selectCell();
  }
});

// Functionality for the down button
down.addEventListener('click', function() { // Add event listener for when the button is clicked
  var cellDetails = document.getElementById("selected");
  var currentCol = cellDetails.className;
  var currentRow = cellDetails.parentNode.className;
  var table = document.getElementsByTagName('table');

  currentRow = Number(currentRow);
  currentCol = Number (currentCol);
  currentRow ++;
  // Control to provent selecting an item outside the table
  if (document.getElementsByTagName('tr')[currentRow] === undefined) {
    return;
  } else {
    var downRow = document.getElementsByTagName('tr')[currentRow];
    nextCell = downRow.childNodes[currentCol];
    resetCell();
    currentCell.removeAttribute('id')
    currentCell = nextCell;
    selectCell();
  }
});

// Functionality for the left button
left.addEventListener('click', function() { // Add event listener for when the button is clicked
  // Control to provent selecting an item outside the table
  if (document.getElementById("selected").previousSibling === null) {
    return;
  } else {
    nextCell = document.getElementById("selected").previousSibling;
    resetCell ();
    currentCell.removeAttribute('id')
    currentCell = nextCell;
    selectCell ();
  }
});

// Functionality for the right button
right.addEventListener('click', function() {    // Add event listener for when the button is clicked
  // Control to provent selecting an item outside the table
  if (document.getElementById("selected").nextSibling === null) {
    return;
  } else {
    nextCell = document.getElementById("selected").nextSibling;
    resetCell ();
    currentCell.removeAttribute('id')
    currentCell = nextCell;
    selectCell ();
  }
});

// Functionality for the Mark Cell button
mark.addEventListener('click', function (){     // Add event listener for when the button is clicked
    document.getElementById("selected").style.backgroundColor = 'yellow';
    // Set the backgroundColor of the object with ID 'selected to Yellow'
});

// Functionality to create the table
function ikeaTable () {
  var tableSize = 4;
  var table = document.createElement('table');    // Create a table element
  var thead = document.createElement('thead');    // Create a table head element
  var tbody = document.createElement('tbody');    // Create a table body element

  // Loop to create the header row cells
  for(var head = 0; head < tableSize; head++){
    var th = document.createElement('th');
    var addTextHead = document.createTextNode("Header " + (head + 1));

    th.appendChild(addTextHead);
    th.setAttribute('align','center');
    thead.appendChild(th);
    thead.style.backgroundColor = 'lightblue';
  }
  table.appendChild(thead);

  // Loop to create table body cells
  for(var rows = 0; rows < tableSize - 1; rows++) {
    var tr = document.createElement('tr');
    tr.setAttribute('class', rows);
    for (var cols = 0; cols < tableSize; cols++) {
      var td = document.createElement('td');
      var addText = document.createTextNode((cols + 1) + ', ' + (rows + 1));
      td.appendChild(addText);
      td.setAttribute('align','center');
      td.setAttribute('class', cols);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  body.appendChild(table);
  table.setAttribute('border', '1');
  //table.setAttribute('align', 'center');
  table.style.width = "75%";
}

// https://stackoverflow.com/questions/8650975/javascript-to-create-a-button-with-onclick
function buttonGenerator() {
  directions = ['Up','Down','Left','Right','Mark Cell'];    // Array with button names
  // Loop through buttons and assign names and ids
  for (var index = 0; index < directions.length; index++){
    var button = document.createElement('input');

    button.type = 'button';
    button.value = directions[index];
    button.id = directions[index];
    body.appendChild(button);
  }
}

// Change the style of selectCell to differintiate
function selectCell() {
  //currentCell.style.borderColor = 'lightblue';
  currentCell.style.borderWidth = '4px';
  currentCell.id = 'selected';      // Set the id of the current object to 'selected'
}

// Set the previous cell back to the default appearance
function resetCell () {
  currentCell.style.borderColor = '';   // Set the Border Color back to default
  currentCell.style.borderWidth = '';   // Set the Border Width back to default
}
