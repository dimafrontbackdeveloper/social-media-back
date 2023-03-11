import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConversationModel } from '../conversation/conversation.model'
import { ConversationService } from '../conversation/conversation.service'
import { MessageController } from './message.controller'
import { MessageGateway } from './message.gateway'
import { MessageModel } from './message.model'
import { MessageService } from './message.service'

@Module({
	controllers: [MessageController],
	providers: [MessageService, MessageGateway, ConversationService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MessageModel,
				schemaOptions: {
					collection: 'Message'
				}
			}
		]),
		TypegooseModule.forFeature([
			{
				typegooseClass: ConversationModel,
				schemaOptions: {
					collection: 'Conversation'
				}
			}
		])
	]
})
export class MessageModule {}
