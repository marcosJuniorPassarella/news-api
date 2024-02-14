import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { NewsModule } from './news/news.module';
import { TestService } from './test/test.service';
@Module({
  imports: [UserModule, AuthModule, CategoriesModule, NewsModule],
  controllers: [],
  providers: [TestService],
})
export class AppModule {}
