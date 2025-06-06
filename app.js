const express = require('express');
const path = require('path');
const multer = require('multer');
const { parseProfilerData } = require('./models/parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, 'inputFile.txt')
});
const upload = multer({ storage });

// GET - 기본 페이지
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'inputFile.txt');
  try {
    const stats = parseProfilerData(filePath);
    res.render('index', {
      coreStats: stats.coreStats,
      taskStats: stats.taskStats
    });
  } catch (error) {
    res.render('index', { coreStats: {}, taskStats: {} });
  }
});

// POST - 파일 업로드 후 분석
app.post('/upload', upload.single('profilerFile'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'inputFile.txt');
  try {
    const stats = parseProfilerData(filePath);
    res.render('index', {
      coreStats: stats.coreStats,
      taskStats: stats.taskStats
    });
  } catch (error) {
    res.status(500).send('파일 분석 중 오류 발생: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`🔗 http://localhost:${PORT} 에서 실행 중`);
});
