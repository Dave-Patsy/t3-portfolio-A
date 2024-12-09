import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import Hero from './hero'

export default function HeroWrapper() {
  return (
    <Suspense  fallback={<Loader2 className='animate-spin stroke-2 text-blue-400'size={24}/>}>
      <Hero/>
    </Suspense>
  )
}
