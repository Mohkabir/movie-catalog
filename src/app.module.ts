import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CatalogueModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
