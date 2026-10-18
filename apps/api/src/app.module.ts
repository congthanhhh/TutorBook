import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { validateEnv } from './config/env.schema.js';
import { HealthModule } from './modules/health/health.module.js';
import { SlipsModule } from './modules/slips/slips.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AllExceptionsFilter } from './share/filters/all-exceptions.filter.js';

@Module({
  imports: [
    // .env nằm ở gốc repo; các lệnh npm -w chạy với cwd là apps/api
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env', validate: validateEnv }),
    PrismaModule,
    HealthModule,
    SlipsModule,
  ],
  providers: [
    // Đăng ký filter qua DI (thay vì app.useGlobalFilters trong main.ts) để test e2e cũng áp dụng
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
