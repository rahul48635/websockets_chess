  'use client'
  import { Button } from "@/components/ui/button";
  import { useRouter } from "next/navigation";
  export default function Home() {
    const router= useRouter()
    return (
        <div className="h-screen w-screen bg-gray flex gap-20">
            <div className="m-10">
              <img src="/chess_img.jpeg" alt="chess_img" className="aspect-square md:w-[400px] sm:w-[300px] w-[200px] rounded" />
            </div>
            <div className="text-white  text-4xl font-extrabold mt-10 absolute right-[50px] ">
                <h1 className="md:w-[200px] w-40 text-center lg:w-[400px]" >Play Chess Oniline on the #2 Site</h1>
                <Button variant="default" className="md:w-[200px] lg:w-[400px] w-[200px] h-[80px] mt-20 bg-green-500 hover:bg-green-400" onClick={()=>router.push('/game')}>
                  <span className="font-extrabold text-2xl">Play Online</span>
                </Button> 
            </div> 
        </div>
    ); 
  }
