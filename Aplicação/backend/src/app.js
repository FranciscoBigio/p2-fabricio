const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cors = require('cors');

// Importação das rotas
const authRoutes = require('./routes/authRoutes'); // SQL
const carroRoutes = require('./routes/carroRoutes'); // NoSQL
const motoRoutes = require('./routes/motoRoutes'); // NoSQL
const roupaRoutes = require('./routes/roupaRoutes'); // NoSQL

const app = express();

app.set('trust proxy', 1);

// Cors
app.use(cors());
app.use(express.json());

// OWASP: Helmet protege contra vulnerabilidades web conhecidas
app.use(helmet());

// OWASP: Prevenção contra Brute Force e DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: "Muitas requisições deste IP, tente novamente mais tarde."
});
app.use('/api/', limiter);

app.use(express.json()); // Body parser

// Rota inicial amigável
app.get('/', (req, res) => {
  res.status(200).json({ 
    mensagem: 'API Backend funcionando perfeitamente!',
    documentacao: 'Acesse /api-docs para testar as rotas'
  });
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registro dos endpoints (Rotas da API)
app.use('/api/auth', authRoutes);
app.use('/api/carros', carroRoutes);
app.use('/api/motos', motoRoutes);
app.use('/api/roupas', roupaRoutes); // Rota atualizada para /api/roupas

module.exports = app;