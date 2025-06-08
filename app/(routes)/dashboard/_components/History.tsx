"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { aiToolsList } from './AitoolsList';
import Link from 'next/link'; // ✅ Use Next.js's Link, not lucide-react
import { Skeleton } from '@/components/ui/skeleton';

function History() {
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    GetHistory();
  }, []);

  const GetHistory = async () => {
    setloading(true)
    const result = await axios.get('/api/history');
    console.log(result.data);
    setUserHistory(result?.data);
    setloading(false)
  }

  const GetAgentName = (path: string) => {
    return aiToolsList.find(item => item.path === path);
  }

  return (
    <div className="mt-5 p-5 border rounded-xl">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What You previously worked on, You can find here</p>

      {loading && (
        <div>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index}>
              <Skeleton className="h-[20px] w-full rounded-md" />
            </div>
          ))}
        </div>
      )}



      {userHistory?.length === 0 && !loading ? (
        <div className="flex items-center justify-center mt-5 flex-col">
          <Image src="/idea.png" alt="bulb" width={50} height={50} />
          <h2>You do Not Have any history</h2>
          <Button className="mt-5">Explore AI Tools</Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {userHistory?.map((history: any, index: number) => {
            const agent = GetAgentName(history?.aiAgentType);

            return (
              <Link
                key={index}
                href={history?.aiAgentType + '/' + history?.recordId}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div className="flex gap-5 items-center">
                  {agent?.icon && (
                    <Image
                      src={agent.icon}
                      alt="image"
                      width={20}
                      height={20}
                    />
                  )}
                  <h2>{agent?.name}</h2>
                </div>
                <h2>{history.createdAt}</h2>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
