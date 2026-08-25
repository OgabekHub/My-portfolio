interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Oddiy, xotiradagi rate limiter.
 *
 * Cheklov: serverless muhitda har bir instance o'z xotirasiga ega va cold
 * start'da hisob nolga tushadi. Portfolio uchun yetarli — maqsad kvotani
 * bir zumda tugatuvchi skriptlarni to'xtatish, mukammal himoya emas.
 * Jiddiyroq kerak bo'lsa Upstash Redis kabi tashqi saqlagich kerak.
 */
export function checkRateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Muddati o'tgan yozuvlarni tozalash — xotira cheksiz o'smasin
  if (buckets.size > 500) {
    buckets.forEach((bucket, bucketKey) => {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    });
  }

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSec: 0 };
}

/** So'rovdan mijoz IP'sini olish (Vercel `x-forwarded-for` beradi). */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
