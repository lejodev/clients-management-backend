import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: 'http://localhost:53506', // Replace with your Angular app's URL
    // methods: 'GET,HEAD,OPTIONS',
    // credentials: true, // If you need to allow credentials
  });
  const port = process.env.PORT || 3000;
  console.log(`Server is running on port ${port}`); // Add this for debugging
  await app.listen(port, "0.0.0.0");
}
bootstrap();
