import express from 'express';
import getDataDashboard from '../../controllers/dashboard/dashboardController.js';
import protect from '../../middlewares/auth.middleware.js';

const RouterDashboard = express.Router()

RouterDashboard.get('/get', protect, getDataDashboard)

export default RouterDashboard