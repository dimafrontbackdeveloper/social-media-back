import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { getMongoConfig } from './config/mongo.config'
import { ConversationModule } from './conversation/conversation.module'
import { MediaModule } from './file/media.module'
import { LogLikesModule } from './log-likes/log-likes.module'
import { MessageModule } from './message/message.module'
import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		PassportModule.register({ session: true }),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		UserModule,
		MessageModule,
		PostModule,
		CommentModule,
		LogLikesModule,
		ConversationModule,
		MediaModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
