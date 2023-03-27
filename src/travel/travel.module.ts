import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Travel, TravelSchema } from './entities/travel.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { Driver, DriverSchema } from '../driver/entities/driver.entity';

@Module({
  controllers: [TravelController],
  providers: [TravelService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Travel.name,
        schema: TravelSchema
      },
      {
        name: User.name,  
        schema: UserSchema,
      },  {
        name: Driver.name,
        schema: DriverSchema,
      }
    ])
  ]
})
export class TravelModule {}
