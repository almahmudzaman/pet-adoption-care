import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptersModule } from './adopters/adopters.module';

@Module({
  imports: [AdoptersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
