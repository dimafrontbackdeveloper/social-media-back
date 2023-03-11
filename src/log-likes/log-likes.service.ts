import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { LogLikesModel } from './log-likes.model'

@Injectable()
export class LogLikesService {
	constructor(
		@InjectModel(LogLikesModel)
		private readonly LogLikesModel: ModelType<LogLikesModel>
	) {}

	async checkExists(userId: Types.ObjectId, postId: Types.ObjectId) {
		return this.LogLikesModel.exists({ post: postId, user: userId })
			.exec()
			.then((data) => !!data)
	}

	async getAllCount(postId: Types.ObjectId) {
		return this.LogLikesModel.find({ post: postId }).count().exec()
	}

	async toggle(userId: Types.ObjectId, postId: Types.ObjectId) {
		const isExists = await this.checkExists(userId, postId)

		if (isExists)
			return this.LogLikesModel.findOneAndDelete({
				post: postId,
				user: userId
			}).exec()
		else
			return this.LogLikesModel.create({
				post: postId,
				user: userId
			})
	}
}
