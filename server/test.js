import http from 'http';

const data = JSON.stringify({ email: 'admin@apexpro.com', password: 'admin123' });

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log(res.statusCode, body));
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
