import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { MessageModel } from '../message/message.model'
import { ConversationController } from './conversation.controller'
import { ConversationModel } from './conversation.model'
import { ConversationService } from './conversation.service'

@Module({
	controllers: [ConversationController],
	providers: [ConversationService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ConversationModel,
				schemaOptions: {
					collection: 'Conversation'
				}
			}
		]),
		TypegooseModule.forFeature([
			{
				typegooseClass: MessageModel,
				schemaOptions: {
					collection: 'Message'
				}
			}
		])
	],
	exports: [ConversationService]
})
export class ConversationModule {}
