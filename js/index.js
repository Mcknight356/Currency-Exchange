/* alert('data is not 100% accurate') */
async function api_listquotes() {
  const options = {
    methode: "GET",
    headers: {
      "X-RapidAPI-Key": "181c259126msh67faf96f20478eep1b9e37jsnca32608537fa",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };
  const url_listquotes = `https://currency-exchange.p.rapidapi.com/listquotes`;
  const response_listquotes = await fetch(url_listquotes, options);
  const listquotes = await response_listquotes.json();
  return listquotes;
}
async function api_exchange(rate) {
  if (rate == undefined) {
    rate = "EUR";
  }
  const options = {
    methode: "GET",
    headers: {
      "X-RapidAPI-Key": "181c259126msh67faf96f20478eep1b9e37jsnca32608537fa",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };
  const url_exchange = `https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=${rate}&q=1.0`;
  const response_exchange = await fetch(url_exchange, options);
  const exchange = await response_exchange.json();
  return exchange;
}
api_exchange();

async function fetchData() {
  try {
    const result = await api_listquotes();

    for (const [key, element] of Object.entries(result)) {
      let selectRate = document.getElementById("selectRate");
      let option = document.createElement("option");
      option.text = element;
      if (element == "USD") {
        selectRate.remove(option);
      } else {
        selectRate.add(option);
      }
    }

    selectRate.addEventListener("change", async function () {
      selectedRate = selectRate.value;
      try {
        let usdRate = document.getElementById("usdRate").value;
        const exchangeResult = await api_exchange(selectedRate);
        let exchangeRate = (document.getElementById("exchangeRate").innerHTML =
          exchangeResult * usdRate);
      } catch (error) {}
    });
  } catch (error) {}
}
usdRate.addEventListener("change", async function () {
  try {
    let usdRate = document.getElementById("usdRate").value;
    const exchangeResult = await api_exchange(selectedRate);
    let exchangeRate = (document.getElementById("exchangeRate").innerHTML =
      exchangeResult * usdRate);
  } catch (error) {}
});
fetchData();
