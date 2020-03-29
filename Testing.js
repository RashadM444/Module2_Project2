let bankCatalog = [{
        bankName: "Газпромбанк",
        investName: "Ваш успех",
        currency: "RUB",
        incomeType: 6.22,
        sumMin: 50000,
        sumMax: null,
        termMin: 12,
        termMax: 12,
        canDeposit: false
    },
    {
        bankName: "Кредит Европа Банк",
        investName: "Оптимальный на 2 года",
        currency: "RUB",
        incomeType: 6.45,
        sumMin: 100000,
        sumMax: null,
        termMin: 24,
        termMax: 24,
        canDeposit: false
    },
    {
        bankName: "Кредит Европа Банк",
        investName: "Оптимальный на 2 года",
        currency: "RUB",
        incomeType: 6.45,
        sumMin: 100000,
        sumMax: null,
        termMin: 24,
        termMax: 24,
        canDeposit: false
    },
    {
        bankName: "Кредит Европа Банк",
        investName: "Оптимальный на 2 года",
        currency: "RUB",
        incomeType: 6.45,
        sumMin: 234,
        sumMax: null,
        termMin: 24,
        termMax: 24,
        canDeposit: false
    },
    {
        bankName: "Кредит Европа Банк",
        investName: "Оптимальный на 2 года",
        currency: "RUB",
        incomeType: 6.45,
        sumMin: 1230,
        sumMax: null,
        termMin: 24,
        termMax: 24,
        canDeposit: false
    }]

console.log(bankCatalog);

let max = bankCatalog.reduce (function (a, b) {
  if (a.sumMin>b.sumMin) {
        return a;}
        return b;
})

let maxarray = bankCatalog.filter(function(val) {
  return val.sumMin == max.sumMin;
});

console.log (max);
console.log (maxarray);
