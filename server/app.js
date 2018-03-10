const express = require('express')
const app = express()

app.get('/', (req, res) => 
{
    res.send('Hello World!')
});
app.use(express.static('../public'))

const port = 8095;
app.listen(port, () => console.log('Speculum Smart Mirror server listening on port ' + port))