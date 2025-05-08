import { Play } from 'next/font/google';
import { Inter } from "next/font/google";
import { Montserrat } from 'next/font/google';

export const play = Play({
  weight: ['400', '700'], // or ['400'] if you want only normal weight
  subsets: ['latin'],
  variable: '--font-play',
});

export const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
  
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // or any specific weights you need
  display: 'swap',

});