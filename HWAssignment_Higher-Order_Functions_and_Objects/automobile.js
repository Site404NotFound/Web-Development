// Author: James Hippler (ONID# 932807333)
// Course: CS 290-400 Web Development
// Homework Assignment: Higher-Order Functions and Objects
// Due: Sunday, October 22, 2017

// This assignment is graded based on correctness and will require you to use higher-order functions
// to sort automobiles. The description is below and can also be found here on jsFiddle.
// You should submit a single .js file called automobile.js which when run with node.js using the
// command "node automobile.js" produces the described results. You must make use of  higher-order
// functions to sort the cars. You should not, for example, create entirely separate functions each
// with dedicated loops to sort the cars. You will need a loop (or potentially more than one loop depending
// on your sorting algorithm of choice) in the sortArr function but that is pretty much it.

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)

    /*Each line representing a car should be produced via a logMe function. This function should be added to the Automobile
    class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year,
    make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited
    and just the "year make model" is logged. */

    this.LogMe = function(printType) {
      if (!printType) {   // If truth value is false
        console.log(this.year + " " + this.make + " " + this.model);    // Only print the year, make, and model
      } else {      // If truth value is true, print year, make, model, AND type
        console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
      }
    }
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    // new Automobile(2008, "ford", "F-150", "pickup")      // Used for testing case sensitivity
];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of
objects appropriate for that comparator and it will return a new array which is sorted with the largest
object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
  var sortedArray = array;        // Copy array to new array that will ultimately be sorted
  var tempValue = 0;        // Establish temporary value and initialize to zero
  do {        // do/while loop that sorts the program.
    sort = false;    // assign the sort value to false initially
    for (var count = 0; count < (sortedArray.length - 1); count++){   // Start a for loop to traverse all array elements
      if (comparator(sortedArray[count], sortedArray[count + 1]) === true){   // take the boolean value from the type comparator.  If true, perform the sort
        tempValue = sortedArray[count];         // Set the temporary value to the current value of the array
        sortedArray[count] = sortedArray[count + 1];    // Swap the values in the array
        sortedArray[count + 1] = tempValue;      // Set the next value in the in array to the current value
        sort = true;    // Set the sort value to true
      }
    }
  } while (sort);   // Continue checking the array while sort is equivalent to true

  return sortedArray;   // Return the sorted array contents
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is
larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){     // Example function provided by instructor.   Never called or used in the program.
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars
is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year) {    // If auto1 year is greater than auto2 year
      return true;      // Return True
    } else {            // If auto2 year is greater than auto1 year
      return false;     // Return False
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which
are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2){
  if (auto1.make.toLowerCase() > auto2.make.toLowerCase()) {     // Changed name to lowercase before testing to make case insensitive
    return true;      // If auto1 make is greater than auto2 make.  Return True
  } else {            // If auto2 make is greater than auto1 make.
    return false;     // Return False
  }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as
follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive.
If two cars are of equal type then the newest one by model year should be considered "greater".*/

function typeComparator(auto1, auto2){
    var typeValue = {"roadster": 1,"pickup": 2,"suv": 3,"wagon": 4};  // Assign car type a numeric value to use for sorting

    if (typeValue[auto1.type.toLowerCase()] === undefined) {    // If auto1's make is not establish in typeValue above (including sedan)
      typeValue[auto1.type.toLowerCase()] = 5;    // Assign the value of 5
      // console.log(auto1.type + " " + auto1.make + " had type set to 5" );    // Used for testing
    }

    if (typeValue[auto2.type.toLowerCase()] === undefined) { // If auto1's make is not establish in typeValue above (including sedan)
      typeValue[auto2.type.toLowerCase()] = 5;  // Assign the value of 5
      // console.log(auto2.type + " " + auto2.make + " had type set to 5" );    // Used for testing
    }

    if (typeValue[auto1.type.toLowerCase()] > typeValue[auto2.type.toLowerCase()]) {      // If the Type value for auto1 is greater
      return true;    // Return true
    } else {          // If the type value for auto2 is greater
      return false;   // Return false
    }
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars.
All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile
class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year,
make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited
and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

printStars();   // Print 5 '*' signs to console log
console.log("The cars sorted by YEAR are: ");       // Print the car list sorted by YEAR
printArrayContent(sortArr(yearComparator, automobiles), false); // Send false to function to ensure TYPE is NOT printed

console.log("\nThe cars sorted by MAKE are: ");   // Print the car list sorted by MAKE
printArrayContent(sortArr(makeComparator, automobiles), false); // Send false to function to ensure TYPE is NOT printed

console.log("\nThe cars sorted by TYPE are: ");      // Print the Car list sorted by TYPE
printArrayContent(sortArr(typeComparator, automobiles), true);    // Send true to function to ensure TYPE is printed
printStars();   // Print 5 '*' signs to console log

function printArrayContent (arrayName, argBoolean) {
  arrayName.forEach(function(print){        // Learned about forEach from Udemy.  Figured I'd try it out for practice.
    print.LogMe(argBoolean)
  });
}

function printStars() {     // Function to print the asterisks used in a dumb attempt to write DRY code.
  console.log("*****");     // Print 5 '*' signs to console log
}
