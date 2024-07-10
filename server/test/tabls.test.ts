import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Conecta Prisma a la base de datos de prueba
  await prisma.$connect();
});

afterAll(async () => {
  // Desconecta Prisma al finalizar todas las pruebas
  await prisma.$disconnect();
});

describe('Database Tables', () => {
  it('should have the Users table created', async () => {
    const tableName = 'Users';

    // Ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;

    // Verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have the Students table created', async () => {
    const tableName = 'Students';

    // Ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;

    // Verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have the Alerts table created', async () => {
    const tableName = 'Alerts';

    // Ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;

    // Verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have the Parents table created', async () => {
    const tableName = 'Parents';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Professors table created', async () => {
    const tableName = 'Professors';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Educational_levels table created', async () => {
    const tableName = 'Educational_levels';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Academic_areas table created', async () => {
    const tableName = 'Academic_areas';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Courses table created', async () => {
    const tableName = 'Courses';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Evaluations table created', async () => {
    const tableName = 'Evaluations';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Evaluation_results table created', async () => {
    const tableName = 'Evaluation_results';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Academic_records table created', async () => {
    const tableName = 'Academic_records';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })

  it('should have the Messages table created', async () => {
    const tableName = 'Messages';
    //ejecuta una consulta para verificar la existencia de la tabla
    const result: [] = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_name = ${tableName}`;
    //verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  })
});
