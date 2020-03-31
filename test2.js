class Application {
    constructor() {
        document
            .querySelector("button")
            .addEventListener("click", this.activateFilter);
    }
    activateFilter() {
        let init = +document.getElementById("initialAmount").value;
        let monthly = +document.getElementById("monthly").value;
        let tenor = +document.getElementById("tenor").value;
        let currency = document.getElementById("currency").value;
        let response = document.getElementById("response");
        response.innerHTML = "";
        if (
                   (init >= 0 &&
                       monthly >= 0 &&
                       tenor > 0 &&
                       tenor % 1 === 0 &&
                       currency == "USD") ||
                   currency == "RUB"
               )




    }


               {
                   let clientDepo = new Deposit(init, monthly, tenor, currency);
                   console.log(clientDepo);
                   let banks = new BankProduct(bankCatalog, clientDepo);
                   let probBanks = banks.filterViableBanks();
                       console.log(probBanks);
                   let calculator = new Calculator (probBanks, clientDepo);
                       console.log(calculator);
                   let lastarray = calculator.mapArrayForFinalDeposit();
                       console.log(lastarray);
                   let finalAmount = calculator.calculateTheFinalAmount(last.array,clientDepo);
                   // make the array for table;
                   //insert array objects into html;

        } else if (init < 0) {
            response.innerHTML =
                "<p>The initial amount must be a positive number</p>";
        } else if (monthly < 0) {
            response.innerHTML =
                response.innerHTML +
                "<p>The monthly amount must be a positive amount</p>";
        } else if (tenor <= 0) {
            response.innerHTML =
                response.innerHTML + "<p>Tenor must be a positive integer</p>";
        } else if (currency !== "RUB" || currency !== "USD") {
            response.innerHTML =
                response.innerHTML + "<p>The available currencies are USD and RUB</p>";
        }
    }
}


class Calculator {
  constructor (probBanks, clientDepo) {
    this.arrayFromBankProduct = probBanks
    this.entryDeposit = clientDepo //you can enter class method by this.function
  }



  calculateTheFinalAmount (array, entryDeposit) {
    let init = entryDeposit.initial;
    let time = entryDeposit.tenor;
    let monthly = entryDeposit.monthly;
    let finalAmount = 0;

    for (i = 0; i <array.length; i++) {
      let percent = array[i].incomeType;
      for (t = 0; t < time; t++) {
        finalAmount = finalAmount * (1+percent/12) + monthly;
      }
      finalAmount = finalAmount - monthly;
    }
    return finalAmount
  }

  mapArrayForFinalDeposit () {
    let array = this.arrayFromBankProduct;
    let sortedArray = array.sort(function (val1, val2) {
      return val1.incomeType - val2.incomeType;
    });
    console.log(sortedArray);
    let highestRateInArray = sortedArray[sortedArray.length - 1];
    let filteredArray = array.filter (function(val) {
      return val.incomeType == highestRateInArray.incomeType;
    })
    return filteredArray
  }
}



class Deposit {
    constructor(paraInitial, paraMonthly, paraTenor, paraCurrency) {
        this.initial = paraInitial;
        this.monthly = paraMonthly;
        this.tenor = paraTenor;
        this.currency = paraCurrency;
    }
}



class BankProduct {
    constructor(array, deposit) {
        this.catalog = array;
        this.inputDeposit = deposit;

    }


}
