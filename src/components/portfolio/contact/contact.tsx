import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ContactForm from './contact-form'

export default function Contact() {
  return (
    <div className='absolute z-50 w-full h-full'>
      <div className='pt-16 h-full flex justify-center items-center'>

        <Card className='bg-transparent w-4/6'>
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
