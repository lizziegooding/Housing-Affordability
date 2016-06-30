// http://www.zillow.com/webservice/GetRateSummary.htm?zws-id=<ZWSID>&output=json&callback=cb
//
// cb( {
//   'request' : {
//     'output' : 'json',
//     'callback' : 'cb'
//   },
//
//   'message' : {
//     'text' : 'Request successfully processed',
//     'code' : '0'
//   },
//
//   'response' : {
//     'today' : {
//       'thirtyYearFixed' : '5.91',
//       'thirtyYearFixedCount' : '1252',
//       'fifteenYearFixed' : '5.68',
//       'fifteenYearFixedCount' : '839',
//       'fiveOneARM' : '5.49',
//       'fiveOneARMCount' : '685'
//     },
//
//     'lastWeek' : {
//       'thirtyYearFixed' : '6.02',
//       'thirtyYearFixedCount' : '8933',
//       'fifteenYearFixed' : '5.94',
//       'fifteenYearFixedCount' : '5801',
//       'fiveOneARM' : '5.71',
//       'fiveOneARMCount' : '3148'
//     }
//   }
// } );
//
// console.log(cb);
