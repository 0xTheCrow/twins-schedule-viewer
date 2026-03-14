"use client";

import getSchedule from "@/src/api/getSchedule";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [stuff, setStuff] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadSuccess, setIsLoadSuccess] = useState(false);

  useEffect(() => {
    getSchedule().then(res => {
      const isSuccess = res.success;
      if (isSuccess) {
        setStuff(res.data);
      }
      console.log(res);
      setIsLoading(false);
      setIsLoadSuccess(isSuccess)
    });
  }, []);


  return (
    <div className="flex min-h-screen items-center justify-center">
      blah blah blah
    </div>
  );
}
