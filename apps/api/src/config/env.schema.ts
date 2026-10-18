import { z } from 'zod';

// Kiểm tra biến môi trường ngay khi khởi động: thiếu hoặc sai thì app dừng với thông báo rõ ràng.
export const envSchema = z.object({
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  PORT: z.coerce.number().int().positive().default(3000),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Biến môi trường không hợp lệ (kiểm tra file .env ở gốc repo):\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
