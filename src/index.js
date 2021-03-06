import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import renderer from './helpers/renderer'
import createStore from './helpers/create-store'
import Routes from './client/routes'

const app = express()

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000'
    return opts
  }
}))
app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore(req)

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  })
  Promise.all(promises).then(() => {
    res.send(renderer(req, store))
  })

})

app.listen(3000, () => {
  console.log('SSR in port 3000');
})
