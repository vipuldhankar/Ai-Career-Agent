import ResumeUploadDialog from '@/app/(routes)/dashboard/_components/ResumeUploadDialog';
import { Button } from '@/components/ui/button';
import { Sparkle } from 'lucide-react';
import { tree } from 'next/dist/build/templates/app-page';
import React, { useState } from 'react'

function Report({ aiReport }: any) {
       const [openResumeUpload, setopenResumeUpload] = useState(false);

       const getTextColor = (per: number) => {
              const color = getStatusColor(per);
              return `text-${color}-500`;
       };

       const getStatusColor = (per: number) => {
              if (per < 60) return 'red';
              if (per >= 60 && per <= 80) return 'yellow';
              return 'green';
       };

       const getBorderColor = (per: number) => {
              const color = getStatusColor(per);
              return `border-${color}-500`;
       };

       return (
              <div>
                     <div className="flex justify-between items-center mb-6">

                            <h2 className="text-3xl font-extrabold text-gray-800 gradient-component-text">AI Analysis Results</h2>

                            <Button onClick={() => setopenResumeUpload(true)}>

                                   Re-analyze <Sparkle/>

                            </Button>

                     </div>





                     <div className="bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-lg shadow-md p-6 mb-6 border border-blue-200 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">

                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">

                                   <i className="fas fa-star text-yellow-500 mr-2"></i> Overall Score

                            </h3>

                            <div className="flex items-center justify-between mb-4">

                                   <span className="text-6xl font-extrabold text-white">{aiReport?.overall_score}<span className="text-2xl">/100</span></span>

                                   <div className="flex items-center">

                                          <i className="fas fa-arrow-up text-green-500 text-lg mr-2"></i>

                                          <span className="text-green-500 text-lg font-bold">{aiReport?.overall_feedback}</span>

                                   </div>

                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">

                                   <div className="bg-white h-2.5 rounded-full" style={{ width: '85%' }}></div>

                            </div>

                            <p className="text-gray-200 text-sm">{aiReport?.summary_comment} </p>

                     </div>





                     {/* Sections */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {['contact_info', 'experience', 'education', 'skills'].map((sectionKey) => {
                                   const section = aiReport?.sections?.[sectionKey];
                                   const color = getStatusColor(section?.score);
                                   const borderColor = getBorderColor(section?.score);
                                   const textColor = getTextColor(section?.score);
                                   const iconMap: Record<string, string> = {
                                          contact_info: 'fa-user-circle',
                                          experience: 'fa-briefcase',
                                          education: 'fa-graduation-cap',
                                          skills: 'fa-lightbulb',
                                   };
                                   const titleMap: Record<string, string> = {
                                          contact_info: 'Contact Info',
                                          experience: 'Experience',
                                          education: 'Education',
                                          skills: 'Skills',
                                   };
                                   return (
                                          <div key={sectionKey} className={`bg-white rounded-lg shadow-md p-7 relative border-b-4 ${borderColor}`}>
                                                 <h4 className="text-lg font-semibold text-gray-700 mb-3">
                                                        <i className={`fas ${iconMap[sectionKey]} text-gray-500 mr-2`}></i>
                                                        {titleMap[sectionKey]}
                                                 </h4>
                                                 <span className={`text-4xl font-bold ${textColor}`}>{section?.score}</span>
                                                 <p className="text-sm text-gray-600 mt-2">{section?.comment}</p>
                                                 <div className={`absolute inset-x-0 bottom-0 h-1 ${color}`}></div>
                                          </div>
                                   );
                            })}
                     </div>




                     <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">

                            <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">

                                   <i className="fas fa-lightbulb text-orange-400 mr-2"></i> Tips for Improvement

                            </h3>

                            <ol className="list-none space-y-4">



                                   {aiReport?.tips_for_improvement.map((item: any, index: number) => (
                                          <li key={index} className="flex items-start gap-4">
                                                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>
                                                 <p className="text-gray-600 text-sm">{item}</p>
                                          </li>
                                   ))}


                            </ol>

                     </div>





                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">

                                   <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">

                                          <i className="fas fa-hand-thumbs-up text-green-500 mr-2"></i> What's Good

                                   </h3>

                                   <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">

                                          {aiReport?.whats_good.map((item: any, index: number) => (
                                                 <li key={index}>{item}</li>
                                          ))}


                                   </ul>

                            </div>

                            <div className="bg-white rounded-lg shadow-md p-5 border border-red-200">

                                   <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">

                                          <i className="fas fa-hand-thumbs-down text-red-500 mr-2"></i> Needs Improvement

                                   </h3>

                                   <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">

                                          {aiReport?.needs_improvement.map((item: any, index: number) => (
                                                 <li key={index}>{item}</li>
                                          ))}


                                   </ul>

                            </div>

                     </div>





                     <div className="bg-blue-600 text-white rounded-lg shadow-md p-6 mb-6 text-center gradient-button-bg">

                            <h3 className="text-2xl font-bold mb-3">Ready to refine your resume? 💪</h3>

                            <p className="text-base mb-4">Make your application stand out with our premium insights and features.</p>

                            <button type="button" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">

                                   Upgrade to Premium <i className="fas fa-arrow-right ml-2 text-blue-600"></i>

                            </button>

                     </div>

                     <ResumeUploadDialog openResumeUpload={openResumeUpload} setopenResumeUpload={setopenResumeUpload} />


              </div>
       )
}

export default Report
