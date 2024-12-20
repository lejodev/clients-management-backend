import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('toolshop API')
    .setDescription('Toolshop internal management API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3000;
  console.log(`Environment PORT: ${process.env.PORT}`); // Debugging
  console.log(`Final Port: ${port}`);
  console.log(`🚀 Server ready at http://0.0.0.0:${port}`);


  app.enableCors({
    origin: 'http://localhost:4200', // Adjust this based on your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  await app.listen(port, "0.0.0.0");
}
bootstrap();
