import express from 'express';
import caseRouter from './routes/case.routes';
import swaggerRouter from './utils/swagger';
import logger from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', caseRouter);
app.use('/', swaggerRouter);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
