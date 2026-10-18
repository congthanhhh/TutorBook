import { Injectable } from '@nestjs/common';
import { parseSlip, type ParseSlipResult } from '@tutorbook/shared';

// Nơi xử lý phiếu bàn giao. Mọi kênh (dán phiếu trên web, import logs/, MCP sau này) đều đi qua service này.
@Injectable()
export class SlipsService {
  validate(text: string): ParseSlipResult {
    return parseSlip(text);
  }
}
