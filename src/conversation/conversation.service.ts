import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { MessageModel } from '../message/message.model'
import { ConversationModel } from './conversation.model'

@Injectable()
export class ConversationService {
	constructor(
		@InjectModel(ConversationModel)
		private readonly ConversationModel: ModelType<ConversationModel>,
		@InjectModel(MessageModel)
		private readonly MessageModel: ModelType<MessageModel>
	) {}

	async byId(id: Types.ObjectId) {
		return this.ConversationModel.findById(id)
			.populate({
				path: 'messages',
				populate: ['userFrom', 'userTo']
			})
			.exec()
	}

	async create(currentUserId: Types.ObjectId, withUserId: Types.ObjectId) {
		let message = await this.MessageModel.findOne({
			userFrom: currentUserId,
			userTo: withUserId
		})

		if (!message)
			message = await this.MessageModel.findOne({
				userTo: currentUserId,
				userFrom: withUserId
			})

		if (message)
			return this.ConversationModel.findOne({
				messages: message._id
			})

		return this.ConversationModel.create({
			messages: []
		})
	}
}
