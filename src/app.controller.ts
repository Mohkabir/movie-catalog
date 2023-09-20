import { Controller, Get } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { TestEvent } from './events/test.event';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/event')
  testEvent(): string {
    // return this.appService.getHello();
    console.log('tesing...');
    const payload = {
      test: true,
    };
    this.eventEmitter.emit('test-event', new TestEvent(payload));
    return 'tested';
  }

  @OnEvent('test-event')
  dispatchTestEvent(testPayload) {
    console.log(testPayload, 'testPayload');
  }
  // count = 0;
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // testingCron() {
  //   this.count++;
  //   console.log(this.count, 'cron is workingg');
  // }
}
