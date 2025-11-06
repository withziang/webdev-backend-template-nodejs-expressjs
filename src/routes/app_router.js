import express from 'express';
const app_router = express.Router();

// -- import functions
import AppServer from '../controllers/AppServer.js';

// end point
app_router.post('/mock', AppServer.mockFunction);
/*
	/:params/?query=.....&query=.......
*/

export default app_router;