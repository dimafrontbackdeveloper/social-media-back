import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { PostModel } from '../post/post.model'
import { UserModel } from '../user/user.model'

export interface LogLikesModel extends Base {}

export class LogLikesModel extends TimeStamps {
	@prop({ ref: () => PostModel })
	post: Ref<PostModel>

	@prop({ ref: () => UserModel })
	user: Ref<UserModel>
}
