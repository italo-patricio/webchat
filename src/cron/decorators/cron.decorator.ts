import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CronDto } from '../dto/cron.dto';

export const CreateCronDto = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return new CronDto(request.body);
  },
);
