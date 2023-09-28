import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) => {
        const errors = validationErrors.map((error) => ({
          property: error.property,
          error: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException({ errors });
      },
      stopAtFirstError: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  const logger = new Logger("Main");
  const port = process.env.PORT || 4000;

  await app.listen(port, () => logger.log(`Listening on port ${port}`));
}
bootstrap();
