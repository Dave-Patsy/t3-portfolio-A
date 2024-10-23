import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ContactForm from './contact-form'

export default function Contact() {
  return (
    <div className='absolute z-50 w-full h-full top-0 left-0'>
      <div className='pt-16 h-full w-full flex justify-center items-center'>

        <Card className='bg-transparent backdrop-blur-sm w-11/12 lg:w-10/12 2xl:w-7/12 '>
          <CardHeader>
            <CardTitle>Contact Me!</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm/>
          </CardContent>

        </Card>
      </div>
    </div>
  )
}
