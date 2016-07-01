## Assumptions:

+ **Structure Type & Cost:**
Single Family Homes and Owned Condominiums, Townhouses, and Mobile Homes. Home values from the US Census American Community Survey 5-year estimates, 2014, Table B25077 and Zillow Home Value Index, May 2016. Note that null values from Zillow reflect the limited nature of Zillow's data coverage and are not errors.
+ **Income:**
$53,482, the national median household income according to American Community Survey 5-year estimates, 2014, Table B19013. $15,080, the annual minimum wage estimate, assumes a single wage-earner household making $7.25, the federal minimum wage, and working full time.
+ **Affordability:**
  + Affordable: Housing costs are 30% or less of gross household income
  + Down Payment: 20% of the home value
  + Mortgage: 30-year amortizing principal interest
  + Interest Rate: 3.85%, the 2015 annual average according to Freddie Mac
  + Property Tax Rate: 1.29%, the average effective property tax rate for single family homes in 2014 according to RealtyTrac
  + Insurance: Home value / 1,000 * 3.5
  + Utilities: $250 per month
+ **Geography:**
All counties in the United States and the District of Columbia.
+ **Calculation:**
Percent of income spent on  = Monthly Housing Costs [Mortgage Payment + Monthly Utilities] + Property Tax + Home Insurance] / Annual Income
