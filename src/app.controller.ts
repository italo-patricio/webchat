import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CronService } from './cron/cron.service';
import { CreateCronDto } from './cron/decorators/cron.decorator';
import { CronDto } from './cron/dto/cron.dto';

@Controller()
export class AppController {
  constructor(private readonly cronService: CronService) {}

  @Get('version')
  getVersion(): any {
    return {
      VERSION: process.env.VERSION,
    };
  }

  @Post('/job/save')
  saveJob(@CreateCronDto() input: CronDto) {
    this.cronService.createCron(input);
    return {
      message: 'Job criado com sucesso',
    };
  }

  @Get('/job/all')
  getAll() {
    return this.cronService.getCrons();
  }

  @Delete('/job')
  deleteJob(@Body('nameJob') name: string) {
    return this.cronService.deleteCron({ name });
  }
}
