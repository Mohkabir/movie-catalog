import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dal/user.entity';
import { CatalogueModule } from './controllers/catalogue/catalogue.module';
import { Movie } from './dal/movie.entity';
import { AccountModule } from './controllers/account/account.module';
import { UserModule } from './services/user/user.module';
import { CinemaModule } from './services/cinema/cinema.module';
import { Cinema } from './dal/cinema.entity';
import { CinemaMovie } from './dal/cinema.movie.entity';
import { Watchlist } from './dal/watchlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      password: '586686',
      username: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Movie, User, Cinema, CinemaMovie, Watchlist],
    }),
    CatalogueModule,
    AccountModule,
    UserModule,
    CinemaModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
