import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ScheduleChangeEventPayload } from './common/dtos/schedule-event-payload.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: SwaggerDocumentOptions = {
    extraModels: [ScheduleChangeEventPayload],
  };

  const config = new DocumentBuilder()
    .setTitle('Train Scheduling API')
    .setDescription('API for managing train schedules and user favorites.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => console.error(err));
