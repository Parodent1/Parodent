import express from 'express';
import bodyParser from 'body-parser'
import patientRoutes from './routes/patientRoutes'
import doctorRoutes from './routes/doctorRoutes'

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use('/api', patientRoutes)
app.use('/api', doctorRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})