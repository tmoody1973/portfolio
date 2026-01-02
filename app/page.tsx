'use client'

import Ubuntu from '../components/ubuntu'
import ReactGA from 'react-ga4'

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID

if (typeof window !== 'undefined' && TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID)
}

export default function Home() {
  return <Ubuntu />
}
