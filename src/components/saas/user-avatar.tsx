


import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserAvatar = () => {
  const session = useSession();

  if(!session) return null
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={session.data!.user.image ??''} />
      <AvatarFallback>
        {session.data!.user.name?.at(0)}
      </AvatarFallback>
    </Avatar>
  );
};
