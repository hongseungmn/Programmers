// server.js (Express.js를 사용하는 경우)
const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

// 정적 파일 서빙을 위한 미들웨어 (클라이언트 측 코드를 호스팅하기 위해)
app.use(express.static('client'));

// 모든 경로에 대한 요청을 인덱스 HTML로 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// 나머지 서버 설정...

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});