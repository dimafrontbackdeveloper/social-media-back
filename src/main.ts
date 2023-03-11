import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors({
		origin: 'http://localhost:3000'
		// methods: ['GET', 'POST']
	})
	await app.listen(4200)
}

bootstrap()
