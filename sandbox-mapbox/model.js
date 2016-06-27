//Calculate annual and montly housing costs based on 20% down (no PMI)
var interestRate = 0.045;
var salePrice = 300000;
var mMortgage = ((interestRate / 12) * (salePrice * 0.8)) / (1 - ((1 + ( interestRate / 12)) ^ (-30 * 12)));
var mInsurance = salePrice / 1000 * 3.5 / 12;
var mUtilities = 250;
// var mPMI = salePrice - (mMortgage * 12) * 0.01;
var mPropertyTax = salePrice * 0.5983 * 0.02 / 12;
var mPayment = mMortgage + mInsurance + mUtilities + mPropertyTax;
var aPayment = mPayment * 12;
