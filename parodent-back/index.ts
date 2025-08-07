import express from 'express';
import bodyParser from 'body-parser'
import patientRoutes from './routes/patientRoutes'
import doctorRoutes from './routes/doctorRoutes'
import cors from 'cors'
import appointmentRoutes from './routes/appointmentRoutes'

//

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use('/apiPatient', patientRoutes)
app.use('/apiDoctor', doctorRoutes)
app.use('/apiAppointment', appointmentRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})