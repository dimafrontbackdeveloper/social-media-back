import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from '../user/user.model'

export interface PostModel extends Base {}

export class PostModel extends TimeStamps {
	@prop()
	content: string

	@prop()
	image?: string

	@prop({ ref: () => UserModel })
	user: Ref<UserModel>
}
