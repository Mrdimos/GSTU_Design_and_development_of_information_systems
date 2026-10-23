import express from 'express';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// TODO: добавить requestId middleware и единый формат ошибок из Общих указаний.
app.use((err, req, res, _next) => {
  const requestId = req.requestId ?? 'not-assigned';
  console.error({ requestId, message: err.message, stack: err.stack });
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Внутренняя ошибка', requestId } });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Server listening on ${port}`));
