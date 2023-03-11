import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { EnumGender } from './user.interface'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	name: string

	@prop({ default: false })
	isVerified: boolean

	@prop()
	birthDate: string

	@prop()
	city: string

	@prop({ enum: EnumGender })
	gender: string

	@prop()
	avatarPath: string

	@prop({ default: [], ref: () => UserModel })
	friends: Ref<UserModel>[]
}
