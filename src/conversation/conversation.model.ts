import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MessageModel } from '../message/message.model'

export interface ConversationModel extends Base {}

export class ConversationModel extends TimeStamps {
	@prop({ default: [], ref: () => MessageModel })
	messages?: Ref<MessageModel>[]
}
