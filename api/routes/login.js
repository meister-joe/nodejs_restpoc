app.post('/login', (req, res) => {
    var data = req.body;
    console.log(data);
    fs.writeFile("request.json", JSON.stringify(data), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("File saved ");
  
  
    });
    var output = JSON.stringify({ status: 'ok' });
    res.append('Content-Type', 'application/json');
    res.end(output);
  });