const express = require('express')
const app = express()

app.get('/', (req, res) => {

})

app.listen(3000, () => {
  console.log('SSR in port 3000');
})
