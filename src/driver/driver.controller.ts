import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.driverService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }

  @Get('/available/:available')
  filterByAvailable(@Param('available', ParseBoolPipe) available:boolean){
    return this.driverService.filterByAvailable(available)
  }

  @Post('/filter_distance')
  filterDriverInRadius3Km(@Body() body: { response: [number, number] }) {
    const { response } = body;
    return this.driverService.getDriverInRadius3Km(response);
  }
}  


