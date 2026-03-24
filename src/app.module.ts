import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptersModule } from './adopters/adopters.module';
import { VetsModule } from './vets/vets.module'; 

@Module({
  imports: [AdoptersModule, VetsModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}