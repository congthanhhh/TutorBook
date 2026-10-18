import { BadRequestException, PipeTransform } from '@nestjs/common';
import type { z } from 'zod';

// Pipe chạy trước controller: kiểm tra dữ liệu đầu vào bằng schema Zod, sai thì trả 400 kèm danh sách lỗi.
// Dùng: @Body(new ZodValidationPipe(schema)) body: Dto
export class ZodValidationPipe<T extends z.ZodType> implements PipeTransform<unknown, z.infer<T>> {
  constructor(private readonly schema: T) {}

  transform(value: unknown): z.infer<T> {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException({
        message: 'Dữ liệu không hợp lệ',
        issues: result.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
      });
    }
    return result.data;
  }
}
