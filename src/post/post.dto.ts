import { IsOptional, IsString } from 'class-validator'

export class PostDto {
	@IsString()
	content: string

	@IsOptional()
	@IsString()
	image?: string
}
