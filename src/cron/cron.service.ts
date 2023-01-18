import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CronDto } from './dto/cron.dto';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  //   @Cron('45 * * * * *')
  //   @Cron(CronExpression.EVERY_30_SECONDS)
  //   handleCron() {
  //     this.logger.debug('Called every 30 seconds');
  //   }

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  createCron(input: Partial<CronDto>) {
    if (this.checkExist(input.name)) {
      throw new ConflictException(`Job ${input.name} already exist`);
    }
    const cron = new CronJob(
      this.parseTimeCron(input),
      () => {
        this.logger.warn(
          `time (${this.parseTimeCron(input)}) for job ${input.name} to run!`,
        );
      },
      null,
      true,
      'America/Recife',
    );

    this.schedulerRegistry.addCronJob(input.name, cron);
  }

  deleteCron({ name }: Partial<CronDto>) {
    if (!this.checkExist(name)) {
      throw new NotFoundException(`Job ${name} not found`);
    }
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);

    return {
      message: `job ${name} deleted!`,
    };
  }

  private checkExist(name: string) {
    return this.schedulerRegistry.doesExist('cron', name);
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const response = [];
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      //   this.logger.log(`job: ${key} -> next: ${next}`);
      response.push({
        key,
        info: `job: ${key} -> next: ${next}`,
      });
    });

    return response;
  }

  parseTimeCron(input: Partial<CronDto>) {
    return `${input.second} ${input.minute} ${input.hour} ${input.dayOfMonth} ${input.month} ${input.dayOfWeek}`;
  }
}
