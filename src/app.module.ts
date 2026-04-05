import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptersModule } from './adopters/adopters.module';
import { VetsModule } from './vets/vets.module';
import { SellersModule } from './sellers/sellers.module';
import { AdminModule } from './admin/admin.module';

import { User } from './common/entities/user.entity';
import { Pet } from './common/entities/pet.entity';
import { AdoptionApplication } from './common/entities/adoption-application.entity';
import { Favorite } from './common/entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',      
      password: '768728',      
      database: 'Pet-adoption-care',  
      entities: [User, Pet, AdoptionApplication, Favorite],
      synchronize: true,         
      logging: true,
    }),

    // Your Adopter Module
    AdoptersModule,
    VetsModule,
    SellersModule,
    AdminModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}