import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CommentDto } from './comment.dto'
import { CommentModel } from './comment.model'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(CommentModel)
		private readonly CommentModel: ModelType<CommentModel>
	) {}

	async byPostId(postId: Types.ObjectId) {
		return this.CommentModel.find({ post: postId }, '-__v')
			.sort({ createdAt: 'desc' })
			.populate('user', 'name avatarPath isVerified')
			.exec()
	}

	async create(userId: Types.ObjectId, dto: CommentDto) {
		return this.CommentModel.create({
			message: dto.message,
			post: dto.postId,
			user: userId
		})
	}
}
