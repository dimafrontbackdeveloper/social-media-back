import { IsObjectId } from 'class-validator-mongo-object-id'

export class DeleteMessageDto {
	@IsObjectId()
	messageId: string

	@IsObjectId()
	conversationId: string
}
