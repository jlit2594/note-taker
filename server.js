const express = require('express');
const noteRoutes = require('./routes/API routes');
const htmlRoutes = require('./routes/HTML routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', noteRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});


