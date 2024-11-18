import express from 'express'
import { userRouter } from './routes/userRoute.js'
import { db } from './db.js'
import { productRouter } from './routes/productRoute.js'
import { cartRouter } from './routes/cartRoute.js'


const app = express()
const port = 3000

app.use(express.json())

// router.route('/like').post

app.use('/cart', cartRouter)
app.use('/products', productRouter)
app.use('/user', userRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})