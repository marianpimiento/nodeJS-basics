const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // Return greetings
    res.write('<html>');
    res.write('<head><title>Greetings</title></head>');
    res.write('<body>');
    res.write('<h1>Greetings</h1>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<input type="text" name="username"></input>');
    res.write('<button type="submit">Enviar</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    // Return list of dummy users
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write('<body>');
    res.write('<h1>Users</h1>');
    res.write('<ul>');
    res.write('<li>User 1</li>');
    res.write('<li>User 2</li>');
    res.write('<li>User 3</li>');
    res.write('<li>User 4</li>');
    res.write('<li>User 5</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    console.log('Create user');
    // Log the request data
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
      res.write('<html>');
      res.write('<head><title>Create user</title></head>');
      res.write('<body>');
      res.write('<h1>Create user</h1>');
      res.write('<h3>New user: '+username+'</h3>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
    
  }

  res.write('<html>');
  res.write('<head><title>Error 404</title></head>');
  res.write('<body><h1>Error 404</h1></body>');
  res.write('</html>');
  return res.end();

};

module.exports = requestHandler;