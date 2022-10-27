const express = require('express');
const cors = require('cors');
const contactController = require('./controllers/contact.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

app.get(contactController.findAll)
app.post(contactController.create)
app.delete(contactController.deleteAll);

app.get(contactController.findAllFavorite);

app.get(contactController.findOne)
app.put(contactController.update)
app.delete(contactController.delete);

// Handle 404 reponse.
app.use((req, res, next) => {
    // Handle for unkown route.
    // Call next() to pass to the error handling middleware.
    return next(new ApiError(404, 'Resource not found'));
});

// Define error-handling middleware last, after other app.use() and routes calls.
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});

module.exports = app;