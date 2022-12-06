import express from 'express';
import { connectDB } from './config/db';
import authRouter from './routes/auth.route';
import todoRouter from './routes/todo.route';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.static('./client/build'));

app.use(cors());

connectDB();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', todoRouter);

app.use((req, res, next) => {
  return res.sendFile('./client/build/index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running in port 5000');
});
