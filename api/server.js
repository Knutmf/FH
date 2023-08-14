const app = require('./app'); // Import the configured server
const PORT = 9000;

app.listen(PORT, () => {
console.log(`Server is running on
http://localhost:${PORT}`
);
});