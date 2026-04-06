import { MailerModule } from '@nestjs-modules/mailer';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdoptersController } from './adopters.controller';
import { AdoptersService } from './adopters.service';
import { JwtStrategy } from './jwt.strategy';

// Entities
import { User } from '../common/entities/user.entity';
import { Pet } from '../common/entities/pet.entity';
import { AdoptionApplication } from '../common/entities/adoption-application.entity';
import { Favorite } from '../common/entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Pet, AdoptionApplication, Favorite]),

    // Mailer Configuration
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'souravzaman10@gmail.com',
          pass: 'wpvl xcve zqnk apdo'

        },
      },
    }),

    // Register the JWT module to enable authentication for adopters.
    // The secret should be managed securely using environment variables (e.g., process.env.JWT_SECRET).
    // This configuration ensures tokens are signed and have a 1-day expiration.
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',   
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdoptersController],
  providers: [AdoptersService, JwtStrategy],
  exports: [AdoptersService, JwtModule], // Exporting JwtModule to make it available for other modules if needed
})
export class AdoptersModule {}