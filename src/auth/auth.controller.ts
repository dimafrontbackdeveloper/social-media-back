import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleCodeDto } from './dto/google-code.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/google')
	async googleAuth(@Body() dto: GoogleCodeDto) {
		return this.authService.googleLogin(dto)
	}
}
