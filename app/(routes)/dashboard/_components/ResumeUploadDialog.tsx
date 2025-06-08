// import React, { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';
// import {
//        Dialog,
//        DialogContent,
//        DialogDescription,
//        DialogFooter,
//        DialogHeader,
//        DialogTitle,
//        DialogTrigger,
// } from "@/components/ui/dialog"
// import { File, Loader2Icon, Sparkles } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@clerk/nextjs';
// function ResumeUploadDialog({ openResumeUpload, setopenResumeUpload }: any) {
//        const [file, setFile] = useState<any>();
//        const [loading, setloading] = useState(false)
//        const router = useRouter();
//        const { has } = useAuth();
//        const onFileChange = (event: any) => {
//               const file = event.target.files?.[0];
//               if (file) {
//                      console.log(file.name);
//                      setFile(file);
//               }
//        }

//        const onUploadAndAnalyze = async () => {
//               setloading(true);
//               const recordId = uuidv4();
//               const formData = new FormData();
//               formData.append('recordId', recordId);
//               formData.append('resumeFile', file);


//               //@ts-ignore
//               const hasSubscriptionEnabled = await has({ plan: "pro_user" })


//               if (!hasSubscriptionEnabled) {

//                      const resultHistory = await axios.get('/api/history');
//                      const historyList = resultHistory.data;
//                      const isPresent = await historyList.find((item: any) => item?.aiAgentType == '/ai-tools/ai-resume-analyzer/');
//                      router.push('/billing');
//                      if (isPresent) {
//                             return null;
//                      }
//               }

//               // Send FormData to Backend Server
//               const result = await axios.post("/api/ai-resume-agent", formData);
//               setloading(false);

//               router.push('/ai-tools/ai-resume-analyzer/' + recordId)
//               setopenResumeUpload(false)
//        }



//        return (
//               <Dialog open={openResumeUpload} onOpenChange={setopenResumeUpload}>
//                      {/* <DialogTrigger>Open</DialogTrigger> */}
//                      <DialogContent>
//                             <DialogHeader>
//                                    <DialogTitle>Upload Resume PDF File</DialogTitle>
//                                    <DialogDescription>
//                                           <div>
//                                                  <label htmlFor="resumeUpload" className='flex items-center flex-col
//                                                  justify-center p-7 border border-dashed rounded-2xl hover:bg-slate-100 curser-pointer' >
//                                                         <File className='h-10 w-10' />
//                                                         {file ?
//                                                                <h2 className='mt-3 text-blue-600'>{file.name}</h2> :
//                                                                <h2 className='mt-3'>Click here to Upload PDF file</h2>
//                                                         }

//                                                  </label>


//                                                  <input type="file" id='resumeUpload' accept='application/pdf' className='hidden'
//                                                         onChange={onFileChange} />

//                                           </div>


//                                    </DialogDescription>
//                             </DialogHeader>
//                             <DialogFooter>
//                                    <Button variant={'outline'} onClick={() => setopenResumeUpload(false)}>
//                                           Cancel
//                                    </Button>

//                                    <Button disabled={!file || loading} onClick={onUploadAndAnalyze}>
//                                           {loading ? <Loader2Icon className='animate-spin' /> : <Sparkles />}
//                                           Upload & Analyze
//                                    </Button>
//                             </DialogFooter>



//                      </DialogContent>
//               </Dialog>
//        )
// }

// export default ResumeUploadDialog



import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
       Dialog,
       DialogContent,
       DialogDescription,
       DialogFooter,
       DialogHeader,
       DialogTitle,
} from "@/components/ui/dialog";
import { File, Loader2Icon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

function ResumeUploadDialog({ openResumeUpload, setopenResumeUpload }: any) {
       const [file, setFile] = useState<any>();
       const [loading, setloading] = useState(false);
       const router = useRouter();
       const { has } = useAuth();

       const onFileChange = (event: any) => {
              const file = event.target.files?.[0];
              if (file) {
                     console.log(file.name);
                     setFile(file);
              }
       };

       const onUploadAndAnalyze = async () => {
              setloading(true);
              const recordId = uuidv4();
              const formData = new FormData();
              formData.append('recordId', recordId);
              formData.append('resumeFile', file);

              //@ts-ignore
              const hasSubscriptionEnabled = await has({ plan: "pro_user" });

              if (!hasSubscriptionEnabled) {
                     console.log("User is not subscribed to Pro plan");

                     try {
                            // Fetch the user's history from the database
                            const resultHistory = await axios.get('/api/history');
                            const historyList = resultHistory.data;

                            // Filter the history entries to count the user's resume entries
                            const userEmail = historyList[0]?.userEmail; // Assuming the user email exists in history data
                            const userHistoryEntries = historyList.filter((item: any) => item.userEmail === userEmail);

                            // If the user has 5 or more entries, redirect them to the billing page
                            if (userHistoryEntries.length >= 3) {
                                   console.log("User has exceeded the 3-entry limit, redirecting to billing...");
                                   router.push('/billing');
                                   return;
                            }
                     } catch (error) {
                            console.log("Error checking history:", error);
                            setloading(false);
                            return;
                     }
              }

              try {
                     // Send FormData to Backend Server
                     const result = await axios.post("/api/ai-resume-agent", formData);
                     console.log(result.data);

                     // Redirect to the generated resume analysis page
                     router.push('/ai-tools/ai-resume-analyzer/' + recordId);
              } catch (error) {
                     console.log("Error uploading and analyzing resume:", error);
              } finally {
                     setloading(false);
                     setopenResumeUpload(false); // Close the dialog after the operation
              }
       };

       return (
              <Dialog open={openResumeUpload} onOpenChange={setopenResumeUpload}>
                     <DialogContent>
                            <DialogHeader>
                                   <DialogTitle>Upload Resume PDF File</DialogTitle>
                                   <DialogDescription>
                                          <div>
                                                 <label
                                                        htmlFor="resumeUpload"
                                                        className="flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl hover:bg-slate-100 cursor-pointer"
                                                 >
                                                        <File className="h-10 w-10" />
                                                        {file ? (
                                                               <h2 className="mt-3 text-blue-600">{file.name}</h2>
                                                        ) : (
                                                               <h2 className="mt-3">Click here to Upload PDF file</h2>
                                                        )}
                                                 </label>

                                                 <input
                                                        type="file"
                                                        id="resumeUpload"
                                                        accept="application/pdf"
                                                        className="hidden"
                                                        onChange={onFileChange}
                                                 />
                                          </div>
                                   </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                   <Button variant={'outline'} onClick={() => setopenResumeUpload(false)}>
                                          Cancel
                                   </Button>

                                   <Button disabled={!file || loading} onClick={onUploadAndAnalyze}>
                                          {loading ? <Loader2Icon className="animate-spin" /> : <Sparkles />}
                                          Upload & Analyze
                                   </Button>
                            </DialogFooter>
                     </DialogContent>
              </Dialog>
       );
}

export default ResumeUploadDialog;
