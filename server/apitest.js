const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('✅ TEST route is alive');
});

app.listen(5001, () => console.log('🚀 TEST SERVER listening on port 5001'));
