import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { PostController } from './post.controller'
import { PostModel } from './post.model'
import { PostService } from './post.service'

@Module({
	controllers: [PostController],
	providers: [PostService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostModel,
				schemaOptions: {
					collection: 'Post'
				}
			}
		])
	]
})
export class PostModule {}
