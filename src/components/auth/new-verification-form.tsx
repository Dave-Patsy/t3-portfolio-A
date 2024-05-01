'use client'

import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './card-wrapper'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import FormError from '../form-error'
import FormSuccess from '../form-success'

let didInit = false;

export default function NewVerificationForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const onSubmit = useCallback(()=>{

    if(!token){
      setError("Missing token");
      return
    } 
    void newVerification(token)
    .then(data =>{
      setError(data.error)
      setSuccess(data.success)
    })
    // .catch(()=>{
    //   setError("something went wrong")
    // })
  },[token] )

  useEffect(()=>{
    if(!didInit){
      didInit = true
      onSubmit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <CardWrapper
      headerLabel='Comfirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && (
          <BeatLoader/>
        )}
        <FormError message={error}/>
        <FormSuccess message={success}/>
      </div>
    </CardWrapper>
  )
}
