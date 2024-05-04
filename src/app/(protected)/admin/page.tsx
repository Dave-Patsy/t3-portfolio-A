import React, { Suspense } from 'react'
import AdminCard from './_components/admin-card';

export default async function Page() {

  return <Suspense fallback={null}><AdminCard/></Suspense>;
}
