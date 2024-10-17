let express = require('express');

let app = express();

app.use(express.static(__dirname+'dist/AHA'));

app.get('*/', (req, resp) =>{
    resp.sendFile(__dirname+'dist/AHA/index.html');
});

app.listen(process.env.PORT || 8080);