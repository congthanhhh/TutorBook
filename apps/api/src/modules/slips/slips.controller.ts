import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../share/pipes/zod-validation.pipe.js';
import { validateSlipSchema, type ValidateSlipDto } from './dto/validate-slip.dto.js';
import { SlipsService } from './slips.service.js';

@Controller('slips')
export class SlipsController {
  constructor(private readonly slipsService: SlipsService) {}

  // Chỉ kiểm tra phiếu, chưa lưu: lưu phiếu sẽ làm sau khi có schema DB.
  @Post('validate')
  @HttpCode(200)
  validate(@Body(new ZodValidationPipe(validateSlipSchema)) body: ValidateSlipDto) {
    return this.slipsService.validate(body.text);
  }
}
