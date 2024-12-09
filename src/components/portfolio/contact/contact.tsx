import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ContactForm from './contact-form'

export default function Contact() {
  return (
    <section
      className="relative z-50 flex min-h-screen w-full items-center justify-center"
      id="contact"
    >
      <div className="absolute left-0 top-0 z-50 h-full w-full">
        <div className="flex h-full w-full items-center justify-center pt-16">
          <Card className="w-full bg-transparent backdrop-blur-sm ">
            <CardHeader>
              <CardTitle>Contact Me!</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
