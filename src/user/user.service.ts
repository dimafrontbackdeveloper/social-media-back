import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UserDto } from './user.dto'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async getUser(_id: Types.ObjectId) {
		const user = await this.UserModel.aggregate()
			.match({ _id })
			.lookup({
				from: 'Post',
				foreignField: 'user',
				localField: '_id',
				as: 'posts'
			})
			.addFields({
				postsCount: {
					$size: '$posts'
				}
			})
			.project({ __v: 0, posts: 0 })

		await this.UserModel.populate(user, {
			path: 'friends',
			select: 'name avatarPath isVerified'
		})

		return user[0]
	}

	async byId(_id: Types.ObjectId) {
		const user = await this.UserModel.findById(_id, '-__v')
		if (!user) throw new UnauthorizedException('User not found')

		return user
	}

	async updateProfile(_id: Types.ObjectId, dto: UserDto) {
		const user = await this.byId(_id)

		user.name = dto.name
		user.city = dto.city
		user.birthDate = dto.birthDate
		user.gender = dto.gender
		user.avatarPath = dto.avatarPath

		return await user.save()
	}

	async toggleFriend(currentUserId: Types.ObjectId, friendId: Types.ObjectId) {
		const currentUser = await this.byId(currentUserId)
		const friend = await this.byId(friendId)

		if (currentUser.friends.includes(friendId)) {
			currentUser.friends = currentUser.friends.filter(
				id => String(id) !== String(friendId)
			)
			friend.friends = friend.friends.filter(
				id => String(id) !== String(currentUserId)
			)
		} else {
			currentUser.friends = [...currentUser.friends, friendId]
			friend.friends = [...friend.friends, currentUserId]
		}

		await currentUser.save()
		await friend.save()

		return true
	}

	async findUser(searchTerm: string) {
		return this.UserModel.find({
			$or: [
				{
					name: new RegExp(searchTerm, 'i')
				}
			]
		})
			.select('-__v')
			.sort({ createdAt: 'desc' })
			.populate('name avatarPath isVerified')
			.exec()
	}
}
