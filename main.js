import express from 'express';
import { CronJob as cron } from 'cron';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import Auth from './src/utils/Auth.js';
import AppServices from './src/services/AppServices.js';
import app_router from './src/routes/app_router.js';

dotenv.config();

// config
const app = express();
const PORT = process.env.PORT || 15009;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api',
	Auth.reqRateLimiterPerSec,
	Auth.reqRateLimiterPerMinute,
	(req, res, next) => {
		const password = req.headers['x-password'];
		if (password !== process.env.X_PASSWORD){
			return res.status(401).json({ error: 'Unauthorized' });
		};
		next();
	},
	app_router
);

// main
try{
	// service task
	const sTask = new cron("0 0 * * * *", () => {
		AppServices.mockFunction();
	}, null, true, 'America/Toronto');

	// feed back
	app.listen(PORT, () => {
		console.log(Date().toLocaleString());
		console.log(`Server Started, PORT: ${PORT}`);
		sTask.start();
	});

} catch(err){
	console.log(err);
}