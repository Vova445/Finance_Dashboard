document.addEventListener('DOMContentLoaded', function() {
  const financialData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Net Income',
      data: [12000, 13000, 12500, 14000, 13500, 14500, 15000],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  const chartConfig = {
    type: 'line',
    data: financialData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  };

  const ctx = document.getElementById('financialChart').getContext('2d');

  window.myChart = new Chart(ctx, chartConfig);
});

const ctx2 = document.getElementById('financialChart').getContext('2d');
const myChart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Income',
      data: [5000, 6000, 7000, 8000, 9000, 10000],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }, {
      label: 'Expenses',
      data: [4000, 4500, 5000, 5500, 6000, 6500],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  }
});







async function getStockPrices() {
  const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=8ZHQOXLOQDEI4CGS');
  const data = await response.json();
  const monthlyData = data['Monthly Time Series'];
  

  const labels = Object.keys(monthlyData).slice(0, 6).reverse(); 
  const prices = labels.map(month => parseFloat(monthlyData[month]['4. close']));
  const formattedLabels = labels.map(month => moment(month).format('MMM YYYY'));
  
  return { labels: formattedLabels, prices };
}



async function drawStockChart() {
  const stockData = await getStockPrices();

  var stockCtx = document.getElementById('stockChart').getContext('2d');
  var stockChart = new Chart(stockCtx, {
    type: 'line',
    data: {
      labels: stockData.labels,
      datasets: [{
        label: 'Stock Prices',
        data: stockData.prices,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

drawStockChart();




async function getExchangeRates() {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  const rates = data.rates;
  
  const currencies = ['UAH', 'USD', 'EUR', 'GBP', 'JPY']; 
  
  const exchangeRates = currencies.map(currency => rates[currency]);
  
  return { currencies, rates: exchangeRates };
}


async function drawExchangeChart() {
  const exchangeData = await getExchangeRates();

  var exchangeCtx = document.getElementById('exchangeChart').getContext('2d');
  var exchangeChart = new Chart(exchangeCtx, {
    type: 'line',
    data: {
      labels: exchangeData.currencies,
      datasets: [{
        label: 'Exchange Rates',
        data: exchangeData.rates,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

drawExchangeChart();


async function getCryptoPrices() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,dogecoin&vs_currencies=usd');
  const data = await response.json();
  

  const cryptocurrencies = Object.keys(data);
  const prices = cryptocurrencies.map(crypto => data[crypto].usd);
  
  return { cryptocurrencies, prices };
}

async function drawCryptoChart() {
  const cryptoData = await getCryptoPrices();

  var cryptoCtx = document.getElementById('cryptoChart').getContext('2d');
  var cryptoChart = new Chart(cryptoCtx, {
    type: 'line',
    data: {
      labels: cryptoData.cryptocurrencies,
      datasets: [{
        label: 'Cryptocurrency Prices',
        data: cryptoData.prices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

drawCryptoChart();






var realEstateCtx = document.getElementById('realEstateChart').getContext('2d');
var realEstateChart = new Chart(realEstateCtx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Property Prices',
            data: [300000, 320000, 330000, 335000, 340000, 345000],
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});






fetch('https://finnhub.io/api/v1/quote?symbol=GOLD&token=coeh6t1r01qjje1uoq80coeh6t1r01qjje1uoq8g')
  .then(response => response.json())
  .then(data => {

    updateCommodityPrice('Gold', data.c); 
  })
  .catch(error => {
    console.error('Помилка при отриманні даних про ціни на сировину:', error);
  });

 

fetch('https://finnhub.io/api/v1/quote?symbol=CORN&token=coeh6t1r01qjje1uoq80coeh6t1r01qjje1uoq8g')
  .then(response => response.json())
  .then(data => {
  
    updateCommodityPrice('Corn', data.c);
  })
  .catch(error => {

    console.error('Помилка при отриманні даних про ціни на кукурудзу:', error);
  });



function updateCommodityPrice(commodity, price) {
  const index = commodityChart.data.labels.indexOf(commodity);
  if (index !== -1) {
    commodityChart.data.datasets[0].data[index] = price;
    commodityChart.update();
  }
}

var commodityCtx = document.getElementById('commodityChart').getContext('2d');
var commodityChart = new Chart(commodityCtx, {
    type: 'bar',
    data: {
        labels: ['Gold', 'Sugar', 'Wheat', 'Corn', 'Copper'],
        datasets: [{
            label: 'Prices',
            data: [0, 0, 0, 0, 0],
            backgroundColor: ['gold', 'brown', 'wheat', 'yellow', 'orange'],
            borderColor: ['gold', 'brown', 'wheat', 'yellow', 'orange'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



var techStockCtx = document.getElementById('techStockChart').getContext('2d');
var techStockChart = new Chart(techStockCtx, {
    type: 'pie',
    data: {
        labels: ['Apple', 'Google', 'Amazon', 'Facebook', 'Microsoft'],
        datasets: [{
            label: 'Stock Prices',
            data: [140, 2800, 3300, 310, 330],
            backgroundColor: ['lightblue', 'lightgreen', 'lightyellow', 'lightcoral', 'lightsalmon'],
            borderColor: ['blue', 'green', 'yellow', 'red', 'orange'],
            borderWidth: 1
        }]
    }
});


var renewableEnergyCtx = document.getElementById('renewableEnergyChart').getContext('2d');
var renewableEnergyChart = new Chart(renewableEnergyCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Renewable Energy Investments',
            data: [150, 200, 250, 300, 350, 400],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 128, 0, 0.1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var blockchainCtx = document.getElementById('blockchainChart').getContext('2d');
var blockchainChart = new Chart(blockchainCtx, {
    type: 'bar',
    data: {
        labels: ['Blockchain', 'Fintech', 'Healthcare', 'Supply Chain', 'Others'],
        datasets: [{
            label: 'Blockchain Technology Adoption',
            data: [50, 70, 80, 60, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var aiMarketCtx = document.getElementById('aiMarketChart').getContext('2d');
var aiMarketChart = new Chart(aiMarketCtx, {
    type: 'doughnut',
    data: {
        labels: ['Hardware', 'Software', 'Services'],
        datasets: [{
            label: 'Artificial Intelligence Market Growth',
            data: [40, 30, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});





// const data = [10, 20, 30, 40, 50];
// const svg = d3.select("#chart")
//               .append("svg")
//               .attr("width", 600)
//               .attr("height", 400);
// svg.selectAll("rect")
//    .data(data)
//    .enter()
//    .append("rect")
//    .attr("x", (d, i) => i * 70)
//    .attr("y", d => 400 - d * 4)
//    .attr("width", 50)
//    .attr("height", d => d * 4)
//    .attr("fill", "steelblue");
// svg.selectAll("text")
//    .data(data)
//    .enter()
//    .append("text")
//    .text(d => d)
//    .attr("x", (d, i) => i * 70 + 25)
//    .attr("y", d => 400 - d * 4 + 20)
//    .attr("text-anchor", "middle")
//    .attr("fill", "white");



document.getElementById("scrollToTopBtn").addEventListener("click", function() {
  scrollToTop();
});

function scrollToTop() {
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, currentScroll - currentScroll / 60);
  }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").classList.remove('is-hidden');
  } else {
    document.getElementById("scrollToTopBtn").classList.add('is-hidden');
  }
}




