const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 3, // Limit each IP to 3 requests per `window` (here, per 2 minutes)
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api', apiRoutes);
app.use(
	'/flightsService',
	createProxyMiddleware({
		target: ServerConfig.FLIGHT_SERVCE,
		changeOrigin: true,
	})
);
app.use(
	'/bookingService',
	createProxyMiddleware({
		target: ServerConfig.BOOKING_SERVICE,
		changeOrigin: true,
	})
);

app.listen(ServerConfig.PORT, () => {
	console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
