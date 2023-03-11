import { forwardRef, Module } from '@nestjs/common';
import { CatalogueController } from './catalogue.controller';
import { MovieModule } from 'src/services/movie/movie.module';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/services/account/auth.module';

@Module({
  imports: [
    forwardRef(() => MovieModule),
    AccountModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CatalogueController],
  providers: [],
})
export class CatalogueModule {}
