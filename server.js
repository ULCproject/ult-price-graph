const express = require('express')
// const Client = require('node-rest-client').Client
// const bodyParser = require('body-parser')
// const client = new Client()

var config = require('./config.json')
const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json')
  next()
})

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('ult.db')

app.get('/ult/info', function (req, res) {
  res.send({symbol: 'ult', marketCap: '', circulatingSupply: '', maxSupply: ''})
})
app.get('/ult/prices', async function (req, res) {
  let prices = []
  let sql = `SELECT timestamp,price FROM t`
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      return
    }
    rows.forEach((row) => {
      prices.push([row['timestamp'], row['price']])
    })
    res.send(prices)
  })
})
app.get('/ult/prices24h', function (req, res) {
  let prices24h = []
  let sql = `SELECT timestamp ,price24h  FROM t`
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      return
    }
    rows.forEach((row) => {
      prices24h.push([row['timestamp'], row['price24h']])
    })
    res.send(prices24h)
  })
})

app.get('/ult/volumes24h', function (req, res) {
  let volumes24h = []
  let sql = `SELECT timestamp ,volume24h FROM t`
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      return
    }
    rows.forEach((row) => {
      volumes24h.push([row['timestamp'], row['volume24h']])
    })
    res.send(volumes24h)
  })
})

app.listen(config.port, function () {
  console.log('server started at localhost:' + config.port + ' ...')
})

// db.close()
