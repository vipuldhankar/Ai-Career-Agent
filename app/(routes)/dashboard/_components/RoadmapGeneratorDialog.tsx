// import React, { useState } from 'react'
// import {
//        Dialog,
//        DialogContent,
//        DialogDescription,
//        DialogFooter,
//        DialogHeader,
//        DialogTitle,
//        DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Loader2Icon, Sparkles, SparklesIcon } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@clerk/nextjs'
// function RoadmapGeneratorDialog({ openRoadmapDialog, setopenRoadmapDialog }: any) {
//        const [userInput, setUserInput] = useState<string>();
//        const [loading, setloading] = useState(false);
//        const router = useRouter();
//        const { has } = useAuth();
//        const GenerateRoadmap = async () => {
//               const roadmapId = uuidv4();
//               setloading(true);
//               try {
//                      //@ts-ignore
//                      const hasSubscriptionEnabled =  has({ plan: 'pro_user' })

//                      if (!hasSubscriptionEnabled) {
//                             console.log("Hello not hasSubscriptionEnabled")
//                             const resultHistory = await axios.get('/api/history');
//                             const historyList = resultHistory.data;
//                             const isPresent = await historyList.find((item: any) => item?.aiAgentType == '/ai-tools/ai-roadmap-agent/');
//                             router.push('/billing');
//                             if (isPresent) {
//                                    return null;
//                             }
//                      }

//                      const result = await axios.post("/api/ai-roadmap-agent", {
//                             roadmapId: roadmapId,
//                             userInput: userInput
//                      });
//                      console.log(result.data);
//               } catch (error) {
//                      console.log(error);
//               }

//               setloading(false);
//               setopenRoadmapDialog(false);
//               router.push('/ai-tools/ai-roadmap-agent/' + roadmapId)

//        }
//        return (
//               <Dialog open={openRoadmapDialog} onOpenChange={setopenRoadmapDialog} >

//                      <DialogContent>
//                             <DialogHeader>
//                                    <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
//                                    <DialogDescription>
//                                           <div>
//                                                  <Input placeholder='e.g Full Stack Developer'
//                                                         onChange={(event) => setUserInput(event?.target?.value)} />
//                                           </div>
//                                    </DialogDescription>
//                             </DialogHeader>
//                             <DialogFooter>
//                                    <Button variant={'outline'} onClick={() => setopenRoadmapDialog(false)}>
//                                           Cancel
//                                    </Button>
//                                    <Button onClick={GenerateRoadmap} disabled={loading || !userInput}>
//                                           {loading ? <Loader2Icon className='animate-spin' /> : <SparklesIcon />} Generate
//                                    </Button>
//                             </DialogFooter>
//                      </DialogContent>
//               </Dialog>
//        )
// }

// export default RoadmapGeneratorDialog


import React, { useState } from 'react';
import {
       Dialog,
       DialogContent,
       DialogDescription,
       DialogFooter,
       DialogHeader,
       DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2Icon, SparklesIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

function RoadmapGeneratorDialog({ openRoadmapDialog, setopenRoadmapDialog }: any) {
       const [userInput, setUserInput] = useState<string>();
       const [loading, setLoading] = useState(false);
       const router = useRouter();
       const { has } = useAuth();

       const GenerateRoadmap = async () => {
              const roadmapId = uuidv4();
              setLoading(true);
              try {
                     // Check subscription status (Pro user or not)
                     //@ts-ignore
                     const hasSubscriptionEnabled = has({ plan: 'pro_user' });

                     if (!hasSubscriptionEnabled) {
                            console.log("User is not subscribed to Pro plan");

                            // Fetch the user's history from the database
                            const resultHistory = await axios.get('/api/history');
                            const historyList = resultHistory.data;

                            // Filter the history entries to count the user's entries
                            const userEmail = historyList[0]?.userEmail; // Assuming the user email exists in history data
                            const userHistoryEntries = historyList.filter((item: any) => item.userEmail === userEmail);

                            // If the user has 5 or more entries, redirect them to the billing page
                            if (userHistoryEntries.length >= 5) {
                                   console.log("User has exceeded the 3-entry limit, redirecting to billing...");
                                   router.push('/billing');
                                   return;
                            }
                     }

                     // Proceed with generating the roadmap if user has a Pro subscription or less than 5 entries
                     const result = await axios.post("/api/ai-roadmap-agent", {
                            roadmapId: roadmapId,
                            userInput: userInput,
                     });

                     console.log(result.data);

                     // Redirect to the generated roadmap page
                     router.push('/ai-tools/ai-roadmap-agent/' + roadmapId);
              } catch (error) {
                     console.log("Error generating roadmap:", error);
              } finally {
                     setLoading(false);
                     setopenRoadmapDialog(false); // Close the dialog after the operation
              }
       };

       return (
              <Dialog open={openRoadmapDialog} onOpenChange={setopenRoadmapDialog}>
                     <DialogContent>
                            <DialogHeader>
                                   <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
                                   <DialogDescription>
                                          <div>
                                                 <Input
                                                        placeholder="e.g Full Stack Developer"
                                                        onChange={(event) => setUserInput(event?.target?.value)}
                                                 />
                                          </div>
                                   </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                   <Button variant={'outline'} onClick={() => setopenRoadmapDialog(false)}>
                                          Cancel
                                   </Button>
                                   <Button onClick={GenerateRoadmap} disabled={loading || !userInput}>
                                          {loading ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} Generate
                                   </Button>
                            </DialogFooter>
                     </DialogContent>
              </Dialog>
       );
}

export default RoadmapGeneratorDialog;
