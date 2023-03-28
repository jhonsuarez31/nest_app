import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverModule } from './driver/driver.module';
import { UserModule } from './user/user.module';
import { TravelModule } from './travel/travel.module';
import { ConfigModule } from '@nestjs/config';

@Module({

  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    DriverModule,
    UserModule,
    TravelModule
  ]
})
export class AppModule { }
