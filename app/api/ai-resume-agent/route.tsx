import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { currentUser } from '@clerk/nextjs/server'
import { getRuns } from "@/lib/inngest";

export async function POST(req: NextRequest) {
       const FormData = await req.formData();
       const resumeFile: any = FormData.get('resumeFile');
       const recordId = FormData.get('recordId');
       const user = await currentUser()

       const loader = new WebPDFLoader(resumeFile);
       const docs = await loader.load();
       console.log(docs[0]) // Raw Pdf Text

       const arrayBuffer = await resumeFile.arrayBuffer();
       const base64 = Buffer.from(arrayBuffer).toString('base64');


       
       const resultIds = await inngest.send({
              name: 'AiResumeAgent',
              data: {
                     recordId: recordId,
                     base64ResumeFile: base64,
                     pdfText: docs[0]?.pageContent,
                     aiAgentType: '/ai-tools/ai-resume-analyzer',
                     userEmail: user?.primaryEmailAddress?.emailAddress

              }
       });

       console.log("data is vipul bahi ",resultIds)

       const runId = resultIds?.ids[0];

       let runStatus;
       try {
              while (true) {
                     runStatus = await getRuns(runId);
                     if (runStatus?.data?.length > 0 && runStatus?.data[0]?.status === 'Completed') {
                            break;
                     }
                     console.log("Current run status:", runStatus);  // Optional: logging the status
                     await new Promise(resolve => setTimeout(resolve, 500));  // 500ms polling
              }
              
              console.log("done bhai")
              console.log("Final runStatus data:", JSON.stringify(runStatus, null, 2));

              console.log("output is", runStatus.data?.[0]?.output);
              const output = runStatus.data?.[0]?.output?.output?.[0];

              if (output) {
                return NextResponse.json(output);
              } else {
                console.log("Output missing");
                return NextResponse.json({ error: "Output is undefined" }, { status: 500 });
              }
              
              // return NextResponse.json(  runStatus.data?.[0].output?.output[0]);
     
       } catch (error) {
              if (error instanceof Error) {
                     console.log(" not done1  bhai")
                     return NextResponse.json({ error: error.message }, { status: 500 });
              } else {
                     console.log(" not done2  bhai")
                     return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
              }
       }
}

// export async function getRuns(runId: string) {
//        try {
//               const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
//                      headers: {
//                             Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
//                      }
//               });

//               if (result.status !== 200) {
//                      throw new Error(`Unexpected status code: ${result.status}`);
//               }

//               return result.data;
//        } catch (error) {
//               console.error('Error fetching run status:', error);
//               throw new Error('Failed to fetch run status');
//        }
// }
