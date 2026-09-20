import ThankYouContent from "@/components/ThankYouContent";

export const metadata = {
  title: "Thank you! | Og'abek Olimjonov",
  robots: { index: false, follow: true },
  alternates: { canonical: "/en/thank-you" },
};

export default function Page() {
  return <ThankYouContent />;
}
