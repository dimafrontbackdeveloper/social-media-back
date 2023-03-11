import { IsEnum, IsString } from 'class-validator'
import { EnumGender } from './user.interface'

export class UserDto {
	@IsString()
	name: string

	@IsString()
	avatarPath: string

	@IsString()
	birthDate: string

	@IsString()
	city: string

	@IsEnum(EnumGender)
	gender: string
}
