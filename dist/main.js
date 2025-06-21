"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const schedule_event_payload_dto_1 = require("./common/dtos/schedule-event-payload.dto");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = {
        extraModels: [schedule_event_payload_dto_1.ScheduleChangeEventPayload],
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Train Scheduling API')
        .setDescription('API for managing train schedules and user favorites.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
//# sourceMappingURL=main.js.map