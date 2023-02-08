import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/services/account/auth.module';
import { AccountController } from './account.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
