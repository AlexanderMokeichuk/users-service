import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 8000
const localhost = `http://localhost:${process.env.PORT || port}`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? port, () => {
    console.log(`Server running at ${localhost}`);
  });
}
void bootstrap();
