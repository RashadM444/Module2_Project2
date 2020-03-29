
let kataloq = [
{
    bankName: "Экспобанк",
    investName: "Специальный (в конце срока)",
    currency: "RUB",
    incomeType: 6.35,
    sumMin: 50000,
    sumMax: 10000000,
    termMin: 6,
    termMax: 6,
    canDeposit: true
},
{
    bankName: "Инвестторгбанк",
    investName: "ИТБ-Пополняемый",
    currency: "RUB",
    incomeType: 6.15,
    sumMin: 50000,
    sumMax: 30000000,
    termMin: 6,
    termMax: 6,
    canDeposit: true
},
{
    bankName: "Транскапиталбанк",
    investName: "ТКБ.Пополняемый",
    currency: "RUB",
    incomeType: 6.15,
    sumMin: 50000,
    sumMax: 30000000,
    termMin: 6,
    termMax: 6,
    canDeposit: true
},
{
    bankName: "Евроазиатский Инвестиционный Банк",
    investName: "Классика",
    currency: "RUB",
    incomeType: 6.1,
    sumMin: 100000,
    sumMax: null,
    termMin: 6,
    termMax: 12,
    canDeposit: true
},
{
    bankName: "Тимер Банк",
    investName: "Надежный выбор",
    currency: "RUB",
    incomeType: 6.35,
    sumMin: 10000,
    sumMax: null,
    termMin: 6,
    termMax: 6,
    canDeposit: true
},
{
    bankName: "Евразийский Банк",
    investName: "TURBO MAXIMUM",
    currency: "RUB",
    incomeType: 6,
    sumMin: 30000,
    sumMax: 299999,
    termMin: 6,
    termMax: 6,
    canDeposit: true
}]

console.log(kataloq);

let sortedarray = kataloq.sort(function (val1, val2) {
  return val1.incomeType - val2.incomeType;
});

console.log(sortedarray);

let highestrate = sortedarray[sortedarray.length -1].incomeType;
console.log(highestrate);

let filterarray = kataloq.filter(function(val) {
  return val.incomeType == highestrate;
});
console.log(filterarray);
