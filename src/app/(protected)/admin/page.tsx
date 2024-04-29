'use client'
import { admin } from "@/actions/admin"
import RoleGate from "@/components/auth/role-gate"
import FormSuccess from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { api } from "@/trpc/react"
import { UserRole } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import {toast} from 'sonner'

export default  function Page() {
  const {refetch} = api.auth.adminTest.useQuery(undefined, {
    enabled:false
  })

  const onServerClick = () => {
    void admin()
    .then((data)=>{
      if(data.error){

        toast.error(data.error)
      }
      if(data.success){
        toast.success(data.success)
      }
    })
  }
  const onClick = () =>{
    void refetch()
      .then((data)=>{
        console.log('refetched')
        if(data.isSuccess){
          toast.success("Allowed API Route")
        } 
        if(data.isError){
          
          toast.error(data.error.message);
        }
      })
  }
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🗝 Admin</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}
