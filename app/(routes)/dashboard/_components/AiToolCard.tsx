"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ResumeUploadDialog from './ResumeUploadDialog';
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog';
interface TOOL {
       name: string;
       desc: string;
       icon: string;
       button: string;
       path: string;
}

type AIToolProps = {  // Fixed the type definition syntax
       tool: TOOL;
};

function AiToolCard({ tool }: AIToolProps) {
       const id = uuidv4();
       const { user } = useUser();
       const router = useRouter();
       const [openResumeUpload, setopenResumeUpload] = useState(false);
       const [openRoadmapDialog, setopenRoadmapDialog] = useState(false);

       const onClickButton = async () => {

              if (tool.name == 'AI Resume Analyzer') {
                     setopenResumeUpload(true);
                     return;
              }
              if (tool.name == 'Career Roadmap Generator') {
                     setopenRoadmapDialog(true);
                     return;
              }



              // create new record
              const result = await axios.post('/api/history', {
                     recordId: id,
                     content: [],
                     aiAgentType: tool.path,
              });
              console.log("Result is ", result);
              router.push(tool.path + "/" + id)

       }




       return (
              <div className="p-3 border rounded-lg">
                     <Image src={tool.icon} width={40} height={40} alt={tool.name} />
                     <h2 className="font-bold mt-2">{tool.name}</h2>
                     <p className="text-gray-400">{tool.desc}</p>

                     {/* <Link href={tool.path + "/" + id}> */}
                     <Button className="w-full mt-3"
                            onClick={onClickButton}    >{tool.button}</Button>
                     {/* </Link> */}

                     <ResumeUploadDialog openResumeUpload={openResumeUpload} setopenResumeUpload={setopenResumeUpload} />
                     <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog} setopenRoadmapDialog={setopenRoadmapDialog} />

              </div>
       );
}

export default AiToolCard;
