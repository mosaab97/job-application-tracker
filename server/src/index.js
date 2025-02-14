const x = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jobsRoutes = require('./routes/jobApplicationRoutes');
const { initialize } = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger.json');
const cors = require('cors');

x.config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Middleware
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobsRoutes);

// Start the server
app.listen(PORT, () => {
    initialize();
  console.log(`Server running on port ${PORT}`);
});
