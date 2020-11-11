const express = require('express');
const app = express(),
      bodyParser = require('body-parser');
const path = require('path');
var axios = require('axios');
const { DESTRUCTION } = require('dns');


const port = process.env.NODE_PORT || 5000;

const root = path.join(__dirname,'stock-broker', 'dist', 'stock-broker');

app.use(bodyParser.json());
//app.use(express.static(__dirname + 'stock-broker/dist/stock-broker'));
app.use(express.static(process.cwd()+"/stock-broker/dist/stock-broker/browser/"));
app.get('/' ,function(req, res) {
  // fs.stat(root + req.path, function(err){
  //   if(err){
  //       res.sendFile("index.html", { root });
  //   }else{
  //       res.sendFile(req.path, { root });
  //   }
  // })
  console.log(path.join(__dirname, 'stock-broker/dist/stock-broker/index.html'))
  //res.sendFile(path.join(__dirname, 'stock-broker/dist/stock-broker/index.html'));
  res.sendFile(process.cwd()+"/stock-broker/dist/stock-broker/browser/index.html")
});

app.get('/api/watchlist', function(req, res){
  res.json('watchlist');
});

app.get('/api/portfolio', (req,res) => {
  res.json('portfolio');
})



app.get('/details/:ticker', (req,res) => {
  var ticker = req.params.ticker;
  var prices = {};
  var meta = {};
  var all = {};
  var url_test= 'https://api.tiingo.com/api/test?token=436b98b29452863e4a82f727567af898611a5d86';
  var url_iex = 'https://api.tiingo.com/iex/?tickers=' + ticker +'&token=436b98b29452863e4a82f727567af898611a5d86' //+ '/prices';
  var url_meta = 'https://api.tiingo.com/tiingo/daily/' + ticker;
  var url_prices = 'https://api.tiingo.com/tiingo/daily/' + ticker + '/prices';

  function getIex(){
    return axios.get(url_iex);
  } 
 function getPrices(){
    return axios.get(url_prices, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 436b98b29452863e4a82f727567af898611a5d86'
      },
      responseType: 'json'
    });
  }
 function getMeta(){
   return axios({
    url: url_meta,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 436b98b29452863e4a82f727567af898611a5d86'
    },
    responseType: 'json'
   })
 }
 Promise.all([getIex(), getMeta()])
 .then(function(results){
   //console.log(results);
   all.data = results[0].data[0];
   all.meta = results[1].data;
   res.send(all);
 })
 .catch(function(error){
   console.log(error);
 }) 
  // axios({
  //   url: url_prices,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Token 436b98b29452863e4a82f727567af898611a5d86'
  //   },
  //   responseType: 'json'
  // })
  // .then(function(response){
  //   all[0] = (response.data[0]);
  //   res.send(all);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

// all.push(prices);
// all.push(meta);

 
})

app.get('/details/:ticker/:date', (req,res)=>{
  var ticker = req.params.ticker;
  var startDate = new Date(req.params.date);
  var chartData = [];
  if(startDate.getDay() >= 5){
    var bd = startDate.getDay();
    if(bd == 5){
      bd = 1;

    }else {
        bd = 2;
    }
    
    var lbd = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' +  (startDate.getDate() + 1 - bd)
    console.log(lbd);
    startDate = new Date(lbd);
  }
  startDate = startDate.toISOString().split('T')[0];
  console.log('Start date is ' + startDate)
  var url_chart = 'https://api.tiingo.com/iex/' + ticker + '/prices?startDate=' + startDate +'&resampleFreq=4min';
  axios({
    url: url_chart,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 436b98b29452863e4a82f727567af898611a5d86'
    },
    responseType: 'json'
   })
   .then((results) => {
     //console.log(results)
     for(data of results.data){
       var dataDate = new Date(data.date);
       var price = data.close;
       chartData.push([dataDate.getTime(),price]);
     } 
    res.send(chartData);
   })
   .catch((error) => {
     console.log(error);
   })
})

app.get('/news/:ticker', (req,res) => {
  var ticker = req.params.ticker;
  urlNews = 'https://newsapi.org/v2/everything?apiKey=8cc2830d12164ffe9a839cf09a63cc99&q=' + ticker;
  axios({
    url: urlNews,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  })
  .then((results) => {
    res.send(results.data);
  })
  .catch((error) => {
    console.log(error);
  })
})

app.get('/history/:ticker/:date', (req,res)=> {
  var ticker = req.params.ticker;
  var startDate = new Date(req.params.date);
  // var endDate = new Date();
  var chartData = [];
  startDate.setFullYear(startDate.getFullYear() - 1);
  console.log('NEW DATE is: ' + startDate.toLocaleDateString())
  startDate = startDate.toISOString().split('T')[0];
  var url_hist = 'https://api.tiingo.com/tiingo/daily/' + ticker + '/prices?startDate=' + startDate + '&resampleFreq=daily'
  axios({
    url: url_hist,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 436b98b29452863e4a82f727567af898611a5d86'
    },
    responseType: 'json'
   })
   .then((results) => {
     //console.log(results);
    for(data of results.data){
      var dataDate = new Date(data.date);
      dataDate = new Date(dataDate.toUTCString())
      // var dt = new Date(1970,0,1);
      // var dateDiff = dataDate.getTime() - dt.getTime();
      // console.log(dateDiff)
      var openPrice = data.open;
      var highPrice = data.high;
      var lowPrice = data.low;
      var closePrice = data.close;
      var volume = data.volume;
      chartData.push([dataDate.getTime(),openPrice, highPrice ,lowPrice ,closePrice, volume]);
      
    }
    res.send(chartData); 
   })
   .catch((error)=>{
     console.log(error);
   })

})

app.get('/search/:input', (req,res) => {
  var searchItem = req.params.input;
  var url_search = 'https://api.tiingo.com/tiingo/utilities/search/' + searchItem;
  axios({
    url: url_search,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 436b98b29452863e4a82f727567af898611a5d86'
    },
    responseType: 'json'
   })
   .then((result) =>{
     res.send(result.data);
   })
})

app.listen(port, ()=>{
  console.log(`Listening on port::${port}`);
})
