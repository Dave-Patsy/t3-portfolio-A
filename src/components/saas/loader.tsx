import Image from "next/image";

export const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-10 w-10 animate-spin">
        <Image alt="Logo" src="/images/logo.png" fill />
      </div>
      <p className="text-sm text-muted-foreground">WebForge is thinking...</p>
    </div>
  );
};
