"use strict";
const main = document.getElementById("main");

const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

const urlAPI = "https://randomuser.me/api";
const howMuchMoney = 1_000_000; // max random money
const firstRandomUser = 3; // people

let data = [];

// Format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (number) =>
  `$ ${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

// Update DOM
const updateDom = function (providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
};

// Add new object to data array
const addData = function (obj) {
  data.push(obj);

  updateDom();
};

// Make user money
const makeUserMoney = () => Math.floor(Math.random() * howMuchMoney);

// Fetch random user
const getRandomUser = async function () {
  const res = await fetch(urlAPI);
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: makeUserMoney(),
  };

  addData(newUser);
};

// Double money
const doubleMoney = function () {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
};

// Sort user by money
const sortByRichest = function () {
  data.sort((a, b) => b.money - a.money);

  updateDom();
};

// Filter - show millionaires
const showMillionaires = function () {
  data = data.filter((user) => user.money > 1_000_000);

  updateDom();
};

// Reduce all wealth
const calculateWealth = function () {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3><strong>Total Wealth:</strong> ${formatMoney(
    wealth
  )}</h3>`;

  main.appendChild(wealthEl);
};

// Start random user
const getFirstRandomUser = function (number) {
  for (let i = 1; i <= number; i++) {
    getRandomUser();
  }
};
getFirstRandomUser(firstRandomUser);

// AddEventListener BTN
addUserBtn.addEventListener("click", () => {
  getRandomUser();

  updateDom();
});

doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
