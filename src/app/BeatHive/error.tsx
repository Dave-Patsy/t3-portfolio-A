"use client";

// import { Empty } from "~/components/saas/empty";

const Error = ({error}:{error: Error & {digest?:string}}) => {
  return(
    <>
      {/* <Empty label="Something went wrong." />; */}
      <h1>{error.message}</h1>
      <h2>{JSON.stringify(error,null,1)}</h2>
    </>
  )
  
};

export default Error;
