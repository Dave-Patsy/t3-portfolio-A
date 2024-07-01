"use client";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SettingsSchema } from "@/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

interface SettingsProps {
  initSession: Session;
}

export default function Test({ initSession }: SettingsProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const utils = api.useUtils();
  const {update} = useSession()
  const { data: session } = api.auth.settingsRouter.getSettings.useQuery(
    undefined,
    {
      initialData: initSession,
    },
  );

  const { mutate, isPending } =
    api.auth.settingsRouter.updateSettings.useMutation({
      async onMutate(variables) {
        await utils.auth.settingsRouter.getSettings.cancel();
        const prevSettings = utils.auth.settingsRouter.getSettings.getData();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        utils.auth.settingsRouter.getSettings.setData(undefined, () => {
          return {
            ...prevSettings,
            user: {
              ...prevSettings?.user,
              isOAuth: prevSettings?.user.isOAuth,
              isTwoFactorEnabled: variables.isTwoFactorEnabled,
            },
            expires: prevSettings?.expires,
          };
        });

        return { prevSettings };
      },
      onError(data, variables, context) {
        utils.auth.settingsRouter.getSettings.setData(
          undefined,
          context?.prevSettings,
        );
        toast.error(data.message)
      },
      async onSettled() {
        await utils.auth.settingsRouter.getSettings.invalidate();
        await update()
      },
      onSuccess() {
          toast.success('Updated!')
      },

    });
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session.user?.name ?? undefined,
      email: session.user?.email ?? undefined,
      role: session.user?.role ?? undefined,
      isTwoFactorEnabled: session.user?.isTwoFactorEnabled ?? undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });

  // const [isPending, startTransition] = useTransition();
  if (!session) return <span>{`You are not logged in :( `}</span>;
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");
    mutate(values);
    // startTransition(() => {
    //   void settings(values)
    //     .then((data) => {
    //       if (data.error) {
    //         setError(data.error);
    //       }
    //       if (data.success) {
    //         void update();
    //         setSuccess(data.success);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong!"));
    // });
  };

  return (
    <div className="">
      <Card className="w-11/12 mx-auto">
        <CardHeader>
          <p className=" text-center text-2xl font-semibold">⚙ Settings</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Tony Tony Tony"
                          type="text"
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {session?.user.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="auth@developer.com"
                              type="email"
                              autoComplete="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="******"
                              type="string"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="*******"
                              type="string"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>2FA</FormLabel>
                        <FormDescription>
                          Enable two Factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
