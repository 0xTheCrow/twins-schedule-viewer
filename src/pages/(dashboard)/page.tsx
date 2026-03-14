"use client";

import getSchedule from "@/src/api/getSchedule";
import PageContent from "@/src/components/layout/PageContent";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [gameMap, setGameMap] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadSuccess, setIsLoadSuccess] = useState(false);

  useEffect(() => {
    getSchedule().then(res => {
      const isSuccess = res.success;
      if (isSuccess) {
        setGameMap(res.data);
      }
      console.log(res);
      setIsLoading(false);
      setIsLoadSuccess(isSuccess)
    });
  }, []);


  return (
    <PageContent>
      blah blah blah
    </PageContent>
  );
}
