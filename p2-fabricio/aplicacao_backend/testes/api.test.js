const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { sequelize } = require('../src/config/postgres');

let token;

// Configuração inicial (Setup)
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await sequelize.sync({ force: true });
});

// Limpeza final (Teardown)
afterAll(async () => {
  await mongoose.connection.close();
  await sequelize.close();
});

describe('Testes de Integração da API', () => {
  
  describe('Autenticação e Usuários (SQL)', () => {
    it('Deve registrar um novo usuário', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Admin', email: 'admin@teste.com', password: '123'
      });
      expect(res.statusCode).toEqual(201);
    });

    it('Deve realizar login e retornar um JWT', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'admin@teste.com', password: '123'
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      token = res.body.token; 
    });
  });

  describe('CRUD de Carros (NoSQL)', () => {
    it('Deve criar um carro', async () => {
      const res = await request(app)
        .post('/api/carros')
        .set('Authorization', `Bearer ${token}`)
        .send({ marca: 'Ford', modelo: 'Ka', ano: 2020 });
      expect(res.statusCode).toEqual(201);
    });
  });

  describe('CRUD de Motos (NoSQL)', () => {
    it('Deve criar uma moto', async () => {
      const res = await request(app)
        .post('/api/motos')
        .set('Authorization', `Bearer ${token}`)
        .send({ marca: 'Yamaha', modelo: 'MT-07', cilindradas: 689, ano: 2023 });
      expect(res.statusCode).toEqual(201);
    });
  });

  describe('CRUD de Roupas (NoSQL)', () => {
    it('Deve criar uma roupa', async () => {
      const res = await request(app)
        .post('/api/roupas')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'Nike', paisOrigem: 'EUA', anoFundacao: 1964 });
      expect(res.statusCode).toEqual(201);
    });
  });

  describe('Segurança e Proteção de Rotas (OWASP)', () => {
    it('Deve negar acesso a carros sem token JWT válido', async () => {
      const res = await request(app).get('/api/carros');
      expect(res.statusCode).toEqual(401);
    });
  });
});