"use client"

import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command, CommandInput } from "cmdk";
import { useEffect, useState } from "react";

export default function Home() {
  // const[]= useState<string>('')
  const [input, setInput] = useState<string>('')
  const[ searchResults, setSearchResults] = useState<{
    results: string[]
    duration: number
  }>()

useEffect(() =>{
const fetchData = async () => {
  if(!input) return setSearchResults(undefined)

    const res= await fetch(`https://fastapi.iruna-kachunska.workers.dev/api/search?q=${input}`)
    const data =(await res.json()) as {results: string[]; duration: number}
    setSearchResults(data)
}

 fetchData()
}, [input])

  return (
  <main className="h-screen w-screen grainy">
    <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in
    animate fade-in-5 slide-in-from-bottom-2.5 ">
   <h1 className="text-7xl tracking-tight font-bold">SpeedSearch⚡</h1>
    <p className="texr-zinc-600 text-lg max-w-prose text-center">
      A high-performance API  built with Hono, Next.js and Cloudflare.
      <br/>{''}
      Type a query below and get your results in mileseconds.
    </p>

    <div className="max-w-xl w-full mx-auto flex justify-center mt-10">
  <Command className="w-full">
    <CommandInput 
      value={input} 
      onValueChange={setInput}  
      placeholder=" 🔍 Search countries..." 
      className="placeholder:text-zinc-900 w-full text-lg border border-gray-300 rounded-md p-3"
    />
    <CommandList>
      {searchResults?.results.length === 0 ? (
        <CommandEmpty>No results found.</CommandEmpty>
      ) : null}
      {searchResults?.results ? (
        <CommandGroup heading = "Results">
          {searchResults.results.map((result) =>(
           <CommandItem key={result} 
                        value={result} 
                        onSelect={setInput}>    
                        {result}
           </CommandItem>
          ))}
        </CommandGroup>
      ) :null }

      {searchResults?. results ?(
        <>
        <div className="h-px w-full bg-zinc-200"/>

        <p className="p-2 text-xs text-zinc-500">
          Found{searchResults.results.length} results in 
          {searchResults?.duration.toFixed(0)}ms

        </p>
        </>
      ): null}
    </CommandList>
  </Command>
</div>
    {/* <input
     value={input} 
     onChange={(e) =>{
        setInput(e.target.value)
     }}
     className='text-zinc-900'
     type="text"/> */}
     </div>
  </main>
  );
}
