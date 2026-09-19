/**
 * OA monogrammasi. Rasm CSS mask sifatida ishlatiladi va joriy accent rangida
 * bo'yaladi — shuning uchun dark va light rejimda alohida fayl kerak emas.
 * Balandlikni className orqali bering (masalan "h-6"); eni nisbatdan chiqadi.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-accent ${className}`}
      style={{
        aspectRatio: "7 / 4",
        WebkitMaskImage: "url(/img/logo-mark.png)",
        maskImage: "url(/img/logo-mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
