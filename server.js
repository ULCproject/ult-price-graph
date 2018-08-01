const express = require('express')
const Client = require('node-rest-client').Client
const bodyParser = require('body-parser')
// const client = new Client()

var config = require('./config.json')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('ult.db')
let sql = `SELECT timestamp,price FROM t`

db.all(sql, [], (err, rows) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(rows)
})
// db.serialize(function () {
//   // db.run('CREATE TABLE lorem (info TEXT)')

//   var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
//   for (var i = 0; i < 10; i++) {
//     stmt.run('Ipsum ' + i)
//   }
//   stmt.finalize()

//   db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
//     console.log(row.id + ': ' + row.info)
//   })
// })

app.get('/ult/info', function (req, res) {
  res.send({symbol: 'ult', marketCap: '', circulatingSupply: '', maxSupply: ''})
})
app.get('/ult/prices', function (req, res) {
  let prices = []
  let sql = `SELECT timestamp,price FROM t`
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(rows)
    prices = rows
  })
  res.send(prices)
})
app.get('/ult/prices24h', function (req, res) {
  let prices24h
  let sql = `SELECT timestamp,price24h FROM t`
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      return
    }
    prices24h = rows
  })
  res.send(prices24h)
})

app.get('/ult/volume24h', function (req, res) {
  let volumes24h
  let sql = `SELECT timestamp,price24h FROM t`
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      return
    }
    volumes24h = rows
  })
  res.send(volumes24h)
})

app.listen(config.port, function () {
  console.log('server started at localhost:' + config.port + ' ...')
})

// db.close()
