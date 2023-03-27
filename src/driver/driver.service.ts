import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { getDistance } from 'src/helpers/getDistance';

@Injectable()
export class DriverService {
  constructor(
  @InjectModel(Driver.name)
    private readonly driverModule: Model<Driver>
  ){}
  async create(createDriverDto: CreateDriverDto) {
    try {
      console.log(createDriverDto)
      const newDriver = await this.driverModule.create(createDriverDto)     
      console.log(newDriver)
      return newDriver;

    } catch (error) {
      console.log('Error')
      if (error.code === 11000) {
        throw new BadRequestException(`Número del documento ya esta registrado en la db ${JSON.stringify(error.keyValue)
          }`)
      }
      console.log(error)
      throw new InternalServerErrorException('No se puede crear el usuario, revisa los logs')
    }

  }

  async findAll() {
    try {
      const driver = await this.driverModule.find()      
      return driver
    } catch (error) {
      throw new BadRequestException(`Error en la base de datos`)
      
    }
  }

  async findOne(term: string) {
    let driver: Driver
    if(!isNaN(+term)){
      driver = await this.driverModule.findOne({ documentIP: term })
    }
    if(!driver && isValidObjectId(term)){
      driver = await this.driverModule.findById(term)
    }
    if (!driver) throw new NotFoundException(`El usuirio ${term} no fue enconotrado`)
    return driver
  }


  async update(id: number, updateDriverDto: UpdateDriverDto) {
    try {
      const driver = await this.driverModule.findOne({documentIP: id})
      await  driver.updateOne(updateDriverDto)
      return {...driver.toJSON(), ...updateDriverDto }
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Número del documento ya esta registrado en la db ${JSON.stringify(error.keyValue)
          }`)
      }
      console.log(error)

    }



  }

  async remove(id: number) {
    try {
      const driver = await this.driverModule.findOne({documentIP: id})
      const deleteDriver = await driver.deleteOne({documentIP: id}) 
      return deleteDriver
    } catch (error) {
      throw new BadRequestException(`Número del documento no existe en la db ${JSON.stringify(error.keyValue)
      }`)
    }
  }

  async filterByAvailable(available: boolean){
    try {
      if( available !== true){
        return `No se pueden encontrar conducores con estado ${available}`
      }
      const drivers = await this.driverModule.find({available: true})
      return drivers
    } catch (error) {
      throw new BadRequestException(`Error en la base de datos`)

    }
  }

  async getDriverInRadius3Km(response: [number, number]) {
    if (!response || !Array.isArray(response)) {
      throw new BadRequestException(`Invalid response parameter`);
    }
  
    try {
      const drivers = await this.findAll();
      const RADIO = 3;
      const driversFilter = drivers.filter(driver => {
 
        const distance = getDistance(
          response[0],
          response[1],
          driver.coordinates[0],
          driver.coordinates[1] 
        );
        console.log('distance: ' + distance);
  
        return Math.floor(distance) === RADIO && driver.available === true;
      });
  
      if (driversFilter.length === 0) {
        return `No se encontraron conductores a un radio de ${RADIO} Km`;
      }
  
      return driversFilter;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Error en la base de datos`);
    }
  }
}
