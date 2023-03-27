import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto, FinishTavelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('Travel')
@Controller('travel')
export class TravelController {

  constructor(private readonly travelService: TravelService) { }
  @ApiOperation({ summary: 'Crear un viaje' })
  @Post('/create_travel')
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
  }


  @ApiOperation({ summary: 'Finalizar un viaje' })
  @Post('/finish_travel')
  finish(@Body() finishTavelDto: FinishTavelDto) {
    return this.travelService.finish(finishTavelDto);
  }


  
  @ApiOperation({ summary: 'Retorna los viajes con estado finalizado' })
  @Get('/state')
  findAll(@Param('sate') state: string) {
    return this.travelService.findAll(state);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(+id, updateTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(+id);
  }
}
