import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import eventRouter from './routes/eventsRoute.js'
import attendeeRouter from './routes/attendeesRoutes.js'
import taskRouter from './routes/taskRoute.js'
import userRouter from './routes/userRoute.js'

// App Config 
const app = express()
const port = process.env.PORT || 4000
connectDB()

// middlewares 
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/event', eventRouter)
app.use('/api/attendee', attendeeRouter)
app.use('/api/task', taskRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port,()=>console.log('Server started on port : '+port))