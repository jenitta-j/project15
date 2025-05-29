const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');

// Populate dropdowns with currency codes
async function loadCurrencies() {
  const res = await fetch('https://api.exchangerate.host/symbols');
  const data = await res.json();
  const symbols = data.symbols;

  for (let code in symbols) {
    const option1 = new Option(`${code} - ${symbols[code].description}`, code);
    const option2 = new Option(`${code} - ${symbols[code].description}`, code);
    fromCurrency.add(option1);
    toCurrency.add(option2);
  }

  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
  const data = await res.json();

  result.textContent = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
}

loadCurrencies();
