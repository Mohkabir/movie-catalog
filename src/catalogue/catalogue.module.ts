import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CatalogueController } from './catalogue.controller';
import { Catalogue } from './catalogue.entity';
import { CatalogueService } from './catalogue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Catalogue]), UserModule],
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}
