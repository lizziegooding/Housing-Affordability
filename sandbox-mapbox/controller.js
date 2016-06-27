//Given a user input, create appropriate breaks

//Dummy user input
// var userInput = 350000;

// function Paint(homeValue){
//   this['fill-outline-color'] = '#FFF';
//   this['fill-opacity'] = 1;
//   this['fill-color'] = {
//     property: 'Median_Hom',
//     stops:
//   }
// }
// 'paint': {
//   'fill-outline-color': '#FFF',
//   // 'fill-color': '#6e599f',
//   'fill-color': {
//     property: 'Median_Hom',
//     stops: [
//             [0, '#F2F12D'],
//             [50000, '#EED322'],
//             [100000, '#E6B71E'],
//             [150000, '#DA9C20'],
//             [200000, '#CA8323'],
//             [250000, '#B86B25'],
//             [300000, '#A25626'],
//     ]
//   },
//   'fill-opacity':  1}
//
var colorArray = ['#F2F12D','#EED322','#E6B71E','#DA9C20','#CA8323','#B86B25','#A25626'];

function colorMap(userInput, myArray){
  var parentArray;
  var myObject = {};
  var percent = 0.15;
  myObject.property = 'Median_Hom';
  for(var yy = 0; yy < myArray.length; yy++){
    parentArray.push([userInput * percent, myArray[yy]]);
    percent += 0.05;
  }
  myObject.stops = parentArray;
  return myObject;
}
