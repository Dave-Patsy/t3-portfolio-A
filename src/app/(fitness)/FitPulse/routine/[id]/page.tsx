"server-only"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/trpc/server"




type param = {
  params: { id: string }
}

export default async function RoutinePage({ params }: param) {

  const routine2 = await api.fitPulse.exerciseRouter.getRoutine({
    id: params.id,
  });

  return (
    <>
      <div className="relative m-auto w-5/6">

        <h1 className="py-2 text-center font-bold text-4xl tracking-tighter ">{routine2?.title}</h1>
   
        <div className="flex flex-col gap-3">

          {routine2?.circuit.map((ele, idx) => (
            <Card className="min-h-24 w-11/12 mx-auto" key={idx}>
              <CardHeader>
                <CardTitle className="ml-5">{ele.type}</CardTitle>
              </CardHeader>
              <CardContent>

                <div className=" flex flex-col gap-4">

                  {ele.setGroup.map((elej, idxj) => (
                    <div key={idxj} className="">
                      <h1 className="ml-5">{elej.exerciseId}</h1>
                      <div className="grid grid-cols-9 my-2 w-full">
                        <h1 className="col-start-2 text-center">set</h1>
                        <h1 className="col-start-4 col-span-2 text-center">lbs</h1>
                        <h1 className="col-start-7 col-span-2 text-center">reps</h1>
                      </div>
                        {elej.setDetails.map((elek, idxk) => (
                          <div key={idxk} className="grid grid-cols-9 my-2 w-full">
                       
                            <div className="col-start-2 bg-white text-black rounded-sm text-center">
                              {idxk + 1}
                            </div>
                            <h1 className="col-start-4 col-span-2 bg-white text-black rounded-sm text-center">
                              {elek.reps}
                            </h1>
                            <h1 className="col-start-7 col-span-2 bg-white text-black rounded-sm text-center">
                              {elek.weight}
                            </h1>
                         
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="mt-2 h-1/6 w-full bg-transparent ring-2 ring-white text-white">Start Workout</Button>
      </div>
    </>
  )
}