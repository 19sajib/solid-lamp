import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

const setupSwagger = (app: INestApplication) => {
	const options = new DocumentBuilder()
		.setTitle('Service API Operations')
		.setDescription('Rest API docs')
		.addBearerAuth({ description: 'User JWT Token', type: 'http', name: 'Authorization', bearerFormat: 'JWT' })
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document, { swaggerOptions: { persistAuthorization: true } });
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api')

  app.use(bodyParser.json({ limit: '50mb'}))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}))
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.useGlobalPipes( new ValidationPipe())
  const logger = new Logger('Startup');
  const config = app.get(ConfigService)
  setupSwagger(app);
  await app.listen(config.get('port'));
  logger.log(`App Started on http://localhost:${config.get('port')}/api`);
}
bootstrap();
