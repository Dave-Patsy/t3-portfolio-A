'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react"

export default function GetMicroData() {
  
  const [data, setData] = useState("")

  const fetchMicro = async () => {
    try{
      const res = await fetch("https://dgwh.adaptable.app/test");
      if(!res.ok){
        console.log("Network response was not ok", res.body);
        throw new Error("Network response was not ok");
      }
      // console.log(res)
      const jsonData:string = await res.json();
      console.log(jsonData);
      setData(jsonData);
      // const x =  
      // setData(x);
    } catch (error) {
      if(error instanceof Error){

        setData(error.message);
      }else{
        setData("failed");
      }
    }
  }

  return (
    <div>
      <h1>MicroService test</h1>

      <Button onClick={fetchMicro}>getMicroData</Button>

      <Label>Response</Label>
      <h1>{JSON.stringify(data,null,1)}</h1>
    </div>
  );
}
