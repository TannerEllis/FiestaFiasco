var express = require('express')
var app = express()
var port = 3000

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile('templates/home.html', { root: __dirname })
})

app.listen(port, function () {
  console.log('FiestaFiasco app listening on port ' + port + '!')
})
