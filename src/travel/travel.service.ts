import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateTravelDto, FinishTavelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { getDistance } from 'src/helpers/getDistance';
import { Driver } from 'src/driver/entities/driver.entity';

@Injectable()
export class TravelService {

  constructor(
    @InjectModel(Travel.name)
    private readonly travelModule: Model<Travel>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Driver.name)
    private readonly driverModel: Model<Driver>
  ) { }
  async create(createTravelDto: CreateTravelDto) {
    try {
      const user = await this.userModel.findById(createTravelDto.user)
      if (!user) return 'Usuaruio no registrado'

      const distance = Math.ceil(getDistance(createTravelDto.start[0], createTravelDto.start[1], createTravelDto.end[0], createTravelDto.end[1]))
      const RATE_FOR_KM = 0.8;
      const costTravel = Math.ceil(distance * RATE_FOR_KM);
      const travel = {
        ...createTravelDto,
        cost: costTravel,
        state: 'SOLICITADO'
      }
      const traveldb = await this.travelModule.create(travel)
      return traveldb
    } catch (error) {
      throw new InternalServerErrorException('No se puede crear el viaje, revisa los logs')

    }
  }

  async finish(finishTavelDto: FinishTavelDto) {
    try {
      const driver = await this.driverModel.findById(finishTavelDto.driver);
      if (!driver) return 'Conductor no registrado no se puede finalizar el viaje'
      const travel = await this.travelModule.findOne({ state: 'SOLICITADO', driver: driver._id })
      if( !travel ) return 'El conducor no tiene ningun viaje registrado'
      const distance = getDistance(finishTavelDto.end[0], finishTavelDto.end[1], travel.end[0], travel.end[1])
      console.log(distance)
      if (distance !== 0) {
        throw new BadRequestException(`No puedes terminar el viaje faltan ${distance} para llegar`)
      }
      const newTavel = {
        ['state']: 'FINALIZADO'
      };

      const travelSave = await this.travelModule.findByIdAndUpdate(travel.id, newTavel, {
        new: true
      })
      return travelSave
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('No se puede finalizar el viaje, revisa los logs')



    }

  }
  async findAll(state : string) {
    try {
      const tralves = await this.travelModule.find({state: 'FINALIZADO'})
      return tralves;
    } catch (error) {
      throw new BadRequestException(`Error en la base de datos`)
      
    } 
  }

  findOne(id: number) {
    return `This action returns a #${id} travel`;
  }

  update(id: number, updateTravelDto: UpdateTravelDto) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
