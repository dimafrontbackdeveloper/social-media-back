import { IsString } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'

export class MessageDto {
	@IsString()
	text: string

	@IsObjectId()
	userFromId: string

	@IsObjectId()
	userToId: string

	@IsObjectId()
	conversationId: string
}
