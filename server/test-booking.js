import http from 'http';

const loginData = JSON.stringify({ email: 'admin@apexpro.com', password: 'admin123' });

const loginReq = http.request({
  hostname: 'localhost',
  port: 3001,
  path: '/api/admin/login',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': loginData.length }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const { token } = JSON.parse(body);
    console.log('Login:', res.statusCode === 200 ? 'OK' : 'FAILED');
    
    // Test get bookings
    const bookingsReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: '/api/bookings',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }, (res2) => {
      let body2 = '';
      res2.on('data', (chunk) => body2 += chunk);
      res2.on('end', () => {
        console.log('Get bookings:', res2.statusCode === 200 ? 'OK' : 'FAILED', '- Count:', JSON.parse(body2).length);
        
        // Test create booking
        const createData = JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '555-1234',
          service: 'residential',
          date: '2026-04-20',
          time: 'TBD'
        });
        
        const createReq = http.request({
          hostname: 'localhost',
          port: 3001,
          path: '/api/bookings',
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Content-Length': createData.length, 'Authorization': `Bearer ${token}` }
        }, (res3) => {
          let body3 = '';
          res3.on('data', (chunk) => body3 += chunk);
          res3.on('end', () => {
            console.log('Create booking:', res3.statusCode === 200 ? 'OK' : 'FAILED');
            if (res3.statusCode !== 200) console.log('Error:', body3);
          });
        });
        createReq.write(createData);
        createReq.end();
      });
    });
    bookingsReq.end();
  });
});

loginReq.write(loginData);
loginReq.end();
