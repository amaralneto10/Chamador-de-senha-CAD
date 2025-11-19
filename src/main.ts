import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
  origin: (origin, callback) => {
    // Permitir chamadas sem origin (ex: Insomnia, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://chamador-de-senha-cad.vercel.app',
    ];

    // Permitir apenas seu frontend
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Bloqueia qualquer outro site
    return callback(new Error('CORS: Origin não permitido'), false);
  },

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
