import { z } from 'zod';

export const validateSlipSchema = z.object({
  text: z.string().trim().min(1, 'Chưa dán phiếu'),
});

export type ValidateSlipDto = z.infer<typeof validateSlipSchema>;
