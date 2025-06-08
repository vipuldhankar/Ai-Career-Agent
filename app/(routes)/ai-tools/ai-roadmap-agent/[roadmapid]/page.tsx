"use client"
import RoadmapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RoadmapCanvas from '../_components/RoadmapCanvas';
function RoadmapGeneratorAgent() {
       const { roadmapid } = useParams();
       const [roadMapDetail, setroadMapDetail] = useState<any>()
       const [openRoadmapDialog, setopenRoadmapDialog] = useState(false);
       useEffect(() => {
              roadmapid && GetRoadmapDetails();
       }, [roadmapid]);

       const GetRoadmapDetails = async () => {
              const result = await axios.get('/api/history?recordId=' + roadmapid);
              console.log(result.data);
              setroadMapDetail(result?.data?.content);
       };

       return (
              <div className='grid grid-cols-1 md:grid-cols-2  gap-5 h-screen'>
                     <div className='border rounded-xl p-5 md:cols-span-2 w-full'>
                            <h2 className='font-bold text-2xl '>{roadMapDetail?.roadmapTitle}</h2>
                            <p className='mt-3 text-gray-500'> <strong>Description:</strong>  <br></br> {roadMapDetail?.description}</p>
                            <h2 className='mt-5 font-medium text-blue-600'>Duration: {roadMapDetail?.duration} </h2>
                            <Button className='mt-5 w-full' onClick={() => setopenRoadmapDialog(true)}> + Create Another Roadmap</Button>
                     </div>
                     <div className="md:col-span-1 w-full h-[80vh]">
                            <RoadmapCanvas initialNodes={roadMapDetail?.initialNodes} initialEdges={roadMapDetail?.initialEdges} />

                     </div>

                     <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog} setopenRoadmapDialog={setopenRoadmapDialog} />

              </div >

       )
}

export default RoadmapGeneratorAgent
