
// const configDatabase = {
//     type: 'postgres',
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     entities: ['dist/**/*.entity{.ts,.js}'],
//     synchronize: true,
//     logging: true,
//     // dropSchema: true,
//     migrations: ['dist/migrations/*.{ts,js}'],
//     ssl: true,
//   };
  
//   export default registerAs('database', () => configDatabase);
  
//   export const dbConfig = new DataSource(configDatabase as DataSourceOptions);