import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

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
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const logger = new Logger('Startup');
  const config = app.get(ConfigService)
  setupSwagger(app);
  await app.listen(config.get('port'));
  logger.log(`App Started on http://localhost:${config.get('port')}/api`);
}
bootstrap();
