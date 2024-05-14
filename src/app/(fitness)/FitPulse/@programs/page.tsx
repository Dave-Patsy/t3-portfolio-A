
import { Button } from "@/components/ui/button"



export default function Page() {
  return (
    <div className="mx-auto flex flex-col w-11/12 justify-center items-center ">
      <h1 className="py-8 text-center text-5xl font-semibold tracking-tighter">
        My Programs
      </h1>
      <Button size={'default'} variant={'outline'} className="w-96 ">Find Program</Button>
    </div>
  );
}