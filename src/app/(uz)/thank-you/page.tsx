import ThankYouContent from "@/components/ThankYouContent";

export const metadata = {
  title: "Rahmat! | Og'abek Olimjonov",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function Page() {
  return <ThankYouContent />;
}
