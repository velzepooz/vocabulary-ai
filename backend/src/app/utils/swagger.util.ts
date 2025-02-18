import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

/**
 * Configures Swagger documentation for the application.
 * Sets up OpenAPI documentation with basic information about the API and
 * makes it available at the /docs endpoint.
 *
 * @param app The NestJS Fastify application instance
 */
export const addSwagger = (app: NestFastifyApplication): void => {
  // Create Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Reservations API')
    .setDescription('REST API for reservations')
    .setVersion('1.0')
    .build();

  // Generate OpenAPI specification document
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI at /docs endpoint
  SwaggerModule.setup('docs', app, document);
};
