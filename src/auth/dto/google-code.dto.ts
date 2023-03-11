import { IsString } from 'class-validator'

export class GoogleCodeDto {
	@IsString()
	code: string
}
