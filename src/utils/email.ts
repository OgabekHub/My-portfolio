import emailjs from "@emailjs/browser";

export interface OwnerEmailPayload {
  name: string;
  subject: string;
  message: string;
  /** Yuboruvchining manzili. Bo'lmasa (masalan mehmonlar daftari) reply_to bo'sh qoladi. */
  email?: string;
}

/**
 * EmailJS orqali sayt egasiga xabar yuboradi.
 * Kalitlar yo'q bo'lsa aniq xatolik tashlaydi — ilgari `!` bilan majburlanib,
 * xato faqat EmailJS ichida tushunarsiz shaklda chiqardi.
 */
export async function sendOwnerEmail(payload: OwnerEmailPayload): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment o'zgaruvchilari sozlanmagan");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      name: payload.name,
      email: payload.email ?? "",
      subject: payload.subject,
      message: payload.message,
      from_name: payload.name,
      reply_to: payload.email ?? "",
    },
    publicKey
  );
}
