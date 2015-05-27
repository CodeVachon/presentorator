var express = require('express'),
    app = express(),
    port = process.env.PORT || 3030;
;

app.use(express.static(__dirname + '/wwwroot'));

app.listen(port, function(){
  console.log('Listening on port ' + port);
});

module.exports = app;
