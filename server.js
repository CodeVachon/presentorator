var express = require('express'),
    app = express(),
    port = process.env.PORT || 3030;
;

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/wwwroot'));

app.listen(port, function(){
  console.log('Listening on port ' + port);
});

module.exports = app;
