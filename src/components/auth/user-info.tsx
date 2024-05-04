'use client'
import { type Session } from "next-auth";
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from "../ui/badge";
import { api } from "@/trpc/react";

interface UserInfoProps {
  initSession: Session| null
  label: string;
}

export const UserInfo = ({ initSession, label }: UserInfoProps) => {
  const { data: session, isPending } = api.auth.settingsRouter.getSettings.useQuery(
    undefined,
    {
      initialData: initSession ?? undefined,
    },
  );
  if(isPending) return null
  if(!session) return null
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate rounded-sm bg-slate-100 p-1 font-mono text-xs">
            {session.user.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[180px] truncate rounded-sm bg-slate-100 p-1 font-mono text-xs">
            {session.user.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[180px] truncate rounded-sm bg-slate-100 p-1 font-mono text-xs">
            {session.user.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[180px] truncate rounded-sm bg-slate-100 p-1 font-mono text-xs">
            {session.user.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA</p>
          <Badge
            variant={
              session.user.isTwoFactorEnabled ? "success" : "destructive"
            }
            className="max-w-[180px] truncate rounded-sm p-1 font-mono text-xs"
          >
            {session.user.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};