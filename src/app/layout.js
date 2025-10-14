import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header';
import Provider from './provider';
import SplashCursor from '@/common/SplashCursor/SplashCursor';
import ParticleSystem from '../components/ParticleSystem';
import SoundSystem from '../components/SoundSystem';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio - TcE',
  description: 'Developer Portfolio',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className} suppressHydrationWarning>
        <Provider>
          <ParticleSystem />
          {/* <SoundSystem /> */}
          {/* <SplashCursor /> */}
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
