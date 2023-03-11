import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { ConversationModel } from '../conversation/conversation.model'
import { MessageDto } from './message.dto'
import { MessageModel } from './message.model'

@Injectable()
export class MessageService {
	constructor(
		@InjectModel(MessageModel)
		private readonly MessageModel: ModelType<MessageModel>,
		@InjectModel(ConversationModel)
		private readonly ConversationModel: ModelType<ConversationModel>
	) {}

	async create(
		userFromId: Types.ObjectId,
		{ userToId, text, conversationId }: MessageDto
	) {
		const newMessage = await this.MessageModel.create({
			userFrom: userFromId,
			userTo: userToId,
			text
		})

		const conversation = await this.ConversationModel.findById(conversationId)

		if (!conversation) throw new NotFoundException('Диалог не найден!')

		conversation.messages = [...conversation.messages, newMessage._id]

		return conversation.save()
	}

	async delete(id: Types.ObjectId, conversationId: string) {
		const deleteMessage = await this.MessageModel.findByIdAndDelete(id).exec()
		if (!deleteMessage) throw new NotFoundException('Сообщение не найдено!')

		const conversation = await this.ConversationModel.findById(conversationId)

		if (!conversation) throw new NotFoundException('Диалог не найден!')

		conversation.messages = conversation.messages.filter(
			(msgId) => String(msgId) !== String(id)
		)

		return conversation.save()
	}
}
