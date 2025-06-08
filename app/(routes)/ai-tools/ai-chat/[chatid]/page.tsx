"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Send, SendHorizonal, SendIcon } from 'lucide-react'
import EmptyState from '../_components/EmptyState'
import axios from 'axios'
import Markdown from 'react-markdown'
import { useParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

type messages = {
       content: string;
       role: string;
       type: string;
}


function AiChat() {
       const [userInput, setuserInput] = useState<string>()
       const id=uuidv4();


       const router = useRouter();

       const [loading, setLoading] = useState(false);
       const [messageList, setmessageList] = useState<messages[]>([]);
       const { chatid }: any = useParams();


       useEffect(() => {
              chatid && GetMessageList();
       }, [chatid]);

       const GetMessageList = async () => {
              const result = await axios.get('/api/history?recordId=' + chatid);
              console.log(result.data);
              setmessageList(result?.data?.content);
       }


       const onSend = async () => {
              setLoading(true);

              setmessageList(prev => [...prev, { content: userInput, role: 'user', type: 'text' }]);

              setuserInput('');

              const result = await axios.post('/api/ai-career-chat-agent', {
                     userInput: userInput
              });
              console.log(result.data);

              setmessageList(prev => [...prev, result.data]);

              setLoading(false);
       };
       console.log(messageList);
       useEffect(() => {
              // message list save to database
              messageList.length > 0 && updateMessageList();

       }, [messageList])


       const updateMessageList = async () => {
              const result = await axios.put('/api/history', {
                     content: messageList,
                     recordId: chatid
              });
              console.log(result);
       }


       const onNewChat= async()=>{
              // create new record
              const result =await axios.post('/api/history',{
                     recordId:id,
                     content:[]
              });
              console.log("Result is ",result);
              router.replace("/ai-tools/ai-chat/"+id)
       
       }



       return (
              <div className='px-10 md:px-24 lg:px-36 xl:px-48   h-[75h] overflow-auto'>
                     <div className='flex items-center justify-between gap-8'>
                            <div>
                                   <h2 className='font-bold text-lg'>AI Career Q&A Chat</h2>
                                   <p>Smarter career decisions start here —</p>
                            </div>
                            <Button onClick={onNewChat }>+ New Chat</Button>
                     </div>

                     <div className='flex flex-col h-[75vh]'>



                            {messageList?.length <= 0 && <div className='mt-5'>
                                   {/* Empty State Options */}

                                   <EmptyState selectedQuestion={(question: string) => setuserInput(question)} />

                            </div>
                            }



                            <div className=' flex-1'>
                                   {/* Message List */}
                                   {messageList?.map((message, index) => (

                                          <div>
                                                 <div key={index} className={`flex mb-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <div
                                                               className={`p-3 rounded-lg gap-2 ${message.role === 'user'
                                                                      ? 'bg-gray-200 text-black rounded-lg'
                                                                      : 'bg-gray-50 text-black'
                                                                      }`}
                                                        >

                                                               <Markdown >
                                                                      {message.content}
                                                               </Markdown>



                                                        </div>
                                                 </div>


                                                 {loading && messageList?.length - 1 == index && <div className=' flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2'>
                                                        {<LoaderCircle className='animate-spin' />} Thinking...
                                                 </div>}

                                          </div>


                                   ))}



                            </div>
                            <div className='flex justify-between items-center gap-6 absolute bottom-5 w-[50%]'>
                                   {/* Input diel d */}
                                   <Input placeholder='Type here' value={userInput} onChange={(event) => setuserInput(event.target.value)} />
                                   <button onClick={onSend} disabled={loading}> <SendIcon /> </button>
                            </div>

                     </div>


              </div>
       )
}

export default AiChat
