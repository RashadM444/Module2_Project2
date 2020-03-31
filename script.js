class Application {
    // make a click button in constructor
    constructor() {
        document.querySelector('#filter-button').addEventListener('click', this.commenceOperation);
    }

    commenceOperation() {
        //Create an object with class Deposit const
        let initialInputByClient = +document.getElementById("initialAmount").value;
        let monthlyInputByClient = +document.getElementById("monthly").value;
        let tenorInputByClient = +document.getElementById("tenor").value;
        let currencyInputByClient = `${document.getElementById("currency").value}`;
        let inputDeposit = new Deposit(initialInputByClient, monthlyInputByClient, tenorInputByClient, currencyInputByClient);
        //create 4 boolean variables let
        let initialAmountDetector;
        let monthlyAmountDetector;
        let tenorDetector;
        let currencyDetector;
        //check each boolean, return true if conditions are met, else return alert
        if (inputDeposit.initialAmount >= 0) {
            initialAmountDetector = true;
        } else {
            alert(`The initial amount must be a positive number`);
        }
        if (inputDeposit.monthlyAmount >= 0) {
            monthlyAmountDetector = true;
        } else {
            alert(`The monthly amount must be a positive number`);
        }
        if (inputDeposit.tenor > 0 && inputDeposit.tenor % 1 === 0) {
            tenorDetector = true;
        } else {
            alert(`The tenor must be a positive integer`);
        }
        if (inputDeposit.currency == `RUB` || inputDeposit.currency == `rub` ||
            inputDeposit.currency == `USD` || inputDeposit.currency == `usd`) {
            currencyDetector = true;
        } else {
            alert(`Only USD and RUB currencies are available at the moment.`)
        }

        //if all booleans are true
        if (initialAmountDetector === true &&
            monthlyAmountDetector === true &&
            tenorDetector === true &&
            currencyDetector === true)
        //create an object of class Calculator let
        {

            let catalogOfBanks = new BankProduct(bankCatalog);
            let mainArray = catalogOfBanks.array;
            console.log(mainArray);
            console.log(inputDeposit);

            let filteringProcess = new Calculator(mainArray, inputDeposit); // continue here
            console.log(filteringProcess);

            //find the array of viable banks - function within CALCULATOR
            let arrayOfPossibleBanks = filteringProcess.filterPossibleArray(inputDeposit);
            console.log(arrayOfPossibleBanks);
            //if array is empty return log ('empty array')

            if (arrayOfPossibleBanks.length === 0) {
                document.getElementById('response').innerHTML = '';
                return alert(`There is no bank available for this deposit`);
            }
            //find the array with highest paying rates
            let arrayOfHighestPayingBanks = filteringProcess.filterBestArray(arrayOfPossibleBanks);
            console.log(arrayOfHighestPayingBanks);
            //calculate the final amount of deposit - function within CALCULATOR
            let finalAmountOfDeposit = filteringProcess.calculateFinalAmount(inputDeposit, arrayOfHighestPayingBanks);
            console.log(finalAmountOfDeposit);

            console.log(finalAmountOfDeposit);

            // take the final array and final amount of deposit and create the table
            let bodyOfTable = '';
            let headOfTable = '<tr><th>Bank Name</th><th>Deposit Type</th><th>Annual Rate</th><th>Final Amount</th></tr>';
            for (let i = 0; i < arrayOfHighestPayingBanks.length; i++) {
                let bankName = arrayOfHighestPayingBanks[i].bankName;
                let depositType = arrayOfHighestPayingBanks[i].investName;
                let annualRate = arrayOfHighestPayingBanks[i].incomeType;
                let final = Math.round(finalAmountOfDeposit);
                bodyOfTable = `<tr><td>${bankName}</td><td>${depositType}</td><td>${annualRate}</td><td>${final}</td></tr>`;
                headOfTable = headOfTable + bodyOfTable;
            }
            let responseTable = document.getElementById('response').innerHTML = `<table class= "response-table">${headOfTable}</table>`;
            return responseTable;
        }
    }
}

class Calculator {
    // add the array from class BankProduct to constructor
    constructor(catalog, deposit) {
            this.allBanks = catalog,
                this.deposit = deposit
            console.log(this.allBanks);

            console.log(this.deposit);

        }
        //filter viable banks
    filterPossibleArray = (deposit) => {
            console.log(deposit);

            let monthlyAmountZeroDetector;
            if (deposit.monthlyAmount > 0) {
                monthlyAmountZeroDetector = false;
            } else if (deposit.monthlyAmount == 0 || deposit.monthlyAmount == null) {
                monthlyAmountZeroDetector = true;
            }
            console.log(monthlyAmountZeroDetector);
            let possibleArray = this.allBanks.filter(function(val) {
                if (monthlyAmountZeroDetector == true) {


                    return (deposit.initialAmount <= val.sumMax ||
                            val.sumMax == null) &&
                        deposit.initialAmount >= val.sumMin &&
                        deposit.tenor <= val.termMax &&
                        deposit.tenor >= val.termMin &&
                        deposit.currency == val.currency;
                } else if (monthlyAmountZeroDetector == false) {
                    return (deposit.initialAmount <= val.sumMax ||
                            val.sumMax == null) &&
                        deposit.initialAmount >= val.sumMin &&
                        deposit.tenor <= val.termMax &&
                        deposit.tenor >= val.termMin &&
                        deposit.currency == val.currency &&
                        val.canDeposit == true;
                }
            });
            console.log(possibleArray);
            return possibleArray;
        }
        //filter array of best options through sort, maxvalue and filter
    filterBestArray = (array) => {
            let sortedArray = array.sort((val1, val2) => {
                return val2.incomeType - val1.incomeType;
            });
            let maxRateOfSortedArray = sortedArray[0].incomeType;
            let bestArray = array.filter((val) => {
                return val.incomeType == maxRateOfSortedArray;
            });
            return bestArray;
        }
        //calculate the final amount of deposit
    calculateFinalAmount = (deposit, array) => {
        let presentValue = deposit.initialAmount;
        let payments = deposit.monthlyAmount;
        let period = deposit.tenor;
        let rate = array[0].incomeType / 12 / 100;

        let futureValue = presentValue * Math.pow((1 + rate), period) +
            payments * (1 + rate) * ((Math.pow((1 + rate), (period - 1)) - 1) / rate);

        return futureValue;
    }
}

class Deposit {
    //put input values by client into the constructor
    constructor(initialAmount, monthlyAmount, tenor, currency) {
        this.initialAmount = initialAmount,
            this.monthlyAmount = monthlyAmount,
            this.tenor = tenor,
            this.currency = currency
    }
}

class BankProduct {
    //put the whole array of banks into constructor
    constructor(array) {
        this.array = array
    }
}

new Application();