import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const newUSer = await this.userModel.create(createUserDto)
      return newUSer
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
      const user = await this.userModel.find()
      return user
    } catch (error) {
      throw new BadRequestException(`Error en la base de datos`)
      
    }  }

  async findOne(term: string) {
    let user: User
    //Buscar por documentIP
    if (!isNaN(+term)) {
      user = await this.userModel.findOne({ documentIP: term })
    }
    //Buscar por MongoID
    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findById(term)
    }
    if (!user) throw new NotFoundException(`El usuirio ${term} no fue enconotrado`)

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({ documentIP: id })
      await user.updateOne(updateUserDto)
      return { ...user.toJSON(), ...updateUserDto }
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
      const user = await this.userModel.findOne({ documentIP: id })
      const deleteUser =await user.deleteOne({ documentIP: id}) 
      return deleteUser
    } catch (error) {
        throw new BadRequestException(`Número del documento no existe en la db ${JSON.stringify(error.keyValue)
          }`)
      }
    }
}

