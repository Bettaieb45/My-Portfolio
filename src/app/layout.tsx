import { Metadata } from 'next';
import { Just_Another_Hand, Poppins, Jura } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import ShapesBackground from '@/components/ShapesBackground';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
// Import fonts
const justAnotherHand = Just_Another_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-just-another-hand', // CSS variable for Just Another Hand
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Add weights as needed
  variable: '--font-poppins', // CSS variable for Poppins
});

const jura = Jura({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // Add weights as needed
  variable: '--font-jura', // CSS variable for Jura
});

// Metadata for the page
export const metadata: Metadata = {
  title: 'Aziz Portfolio',
  description:
    "Aziz's personal portfolio website showcasing skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${justAnotherHand.variable} ${poppins.variable} ${jura.variable}`}
    >
      <SpeedInsights />
      <body className="bg-background text-foreground antialiased">
        <Header />
        {/* Header stays outside the relatively positioned container */}
        <main className="relative min-h-screen w-full">
          <ShapesBackground /> {/* Shapes stay within the content area */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
