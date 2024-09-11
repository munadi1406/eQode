import  Benefits  from '@/components/raport/sections/Benefits'
import Example from '@/components/raport/sections/Example'
import Features from '@/components/raport/sections/Features'
import Footer from '@/components/raport/sections/Footer'
import { Hero } from '@/components/raport/sections/Hero'
import React from 'react'

export default function Page() {
  return (
    <div>
        <Hero/>
        <Benefits/>
        <Features/>
        <Example/>
        <Footer/>
    </div>
  ) 
}
