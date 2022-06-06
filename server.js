const path = require('path')
const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const productRoutes = require('./routes/productRoutes')


dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api/reviews', productRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
