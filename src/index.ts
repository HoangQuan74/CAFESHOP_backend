import express from 'express';
import session from 'express-session';
import cors from 'cors';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';
import morgan from 'morgan';
import { AppDataSource } from './ormconfig';
const router = require('./api')

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'origin, authorization, access-token, content-type',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
const logStream = fs.createWriteStream('error.log', { flags: 'a' });

app.use(morgan('dev'));
app.use(
    morgan('combined', {
        skip: (req, res) => res.statusCode !== 500,
        stream: logStream,
    }),
);

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'MySecret',
        resave: true,
        saveUninitialized: true,
        cookie: { httpOnly: true, secure: false, sameSite: 'none' },
    }),
);

//api
app.use('/api/users', router);
app.use('/api/managers', router);
app.use('/api/customers', router);

const httpServer = http.createServer(app);

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        httpServer.listen(process.env.PORT, () => {
            console.log(`Connected to ${process.env.PORT}`);  
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();



