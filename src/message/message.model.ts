import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from '../user/user.model'

export interface MessageModel extends Base {}

export class MessageModel extends TimeStamps {
	@prop()
	text: string

	@prop({ ref: () => UserModel })
	userFrom: Ref<UserModel>

	@prop({ ref: () => UserModel })
	userTo: Ref<UserModel>
}
