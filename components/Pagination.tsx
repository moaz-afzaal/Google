"use client";

import {usePathname,useRouter,useSearchParams} from "next/navigation"


import { useState } from "react";

interface PaginationProps{
    next: number,
    prev:number
}

function Pagination({ next, prev }: PaginationProps) {
    const [page, setPage] = useState<number>(1);

  const router = useRouter();
  const path = usePathname();
  const searchParams=useSearchParams()

  
    function prevPage() {
      if (prev) {
        router.push(path + "?" + "q=" + searchParams.get("q") + "&start=" + prev)
        setPage(page - 1)
      } else {
        return
        }
    }
    function nextPage() {
        if (next) {
          router.push(
            path + "?" + "q=" + searchParams.get("q") + "&start=" + next
          );
          setPage(page + 1);
        } else {
          return;
        }
    }
  return (
    <div className="join my-10">
      <button className="join-item btn" onClick={prevPage}>«</button>
          <button className="join-item btn">Page {page}</button>
      <button className="join-item btn" onClick={nextPage}>»</button>
    </div>
  );
}

export default Pagination