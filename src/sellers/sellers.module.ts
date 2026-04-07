import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SellersController],
  providers: [SellersService, JwtStrategy],
  exports: [SellersService],
})
export class SellersModule {}
