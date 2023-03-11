import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { LogLikesController } from './log-likes.controller'
import { LogLikesModel } from './log-likes.model'
import { LogLikesService } from './log-likes.service'

@Module({
	controllers: [LogLikesController],
	providers: [LogLikesService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: LogLikesModel,
				schemaOptions: {
					collection: 'Log-likes'
				}
			}
		])
	]
})
export class LogLikesModule {}
