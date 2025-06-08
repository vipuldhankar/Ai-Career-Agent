"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Report from './_component/Report';

function AiResumeAnalyzer() {
       const { recordid } = useParams();
       const [pdfUrl, setpdfUrl] = useState();
       const [aiReport, setaiReport] = useState();
       useEffect(() => {
              recordid && GetResumeAnalyzerRecord();

       }, [recordid])

       const GetResumeAnalyzerRecord = async () => {
              const result = await axios.get('/api/history?recordId=' + recordid);
              console.log(result.data);
              setpdfUrl(result.data?.metaData);
              setaiReport(result.data?.content);
       }


       return (
              <div className='grid lg:grid-cols-5 grid-cols-1'>
                     <div className='col-span-2'>
                            <Report aiReport={aiReport} />
                     </div>
                     <div className='col-span-3'>
                            <h2 className='font-bold text-2xl mb-5'>Resume Preview</h2>
                            <iframe
                                   src={pdfUrl}
                                   width="100%"
                                   height={1000}
                                   className="w-full"
                                   style={{
                                          border: 'none'
                                   }}
                            />

                     </div>
              </div>

       )
}

export default AiResumeAnalyzer
