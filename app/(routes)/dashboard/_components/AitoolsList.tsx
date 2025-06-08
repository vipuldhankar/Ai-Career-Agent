import React from 'react';
import AiToolCard from './AiToolCard';

export const aiToolsList = [
       {
              name: 'AI Career Q&A Chat',
              desc: 'Chat with AI Agent',
              icon: '/chatbot.png',
              button: 'Lets Chat',
              path: '/ai-tools/ai-chat'
       },
       {
              name: 'AI Resume Analyzer',
              desc: 'Improve your resume',
              icon: '/resume.png',
              button: 'Analyze Now',

              path: '/ai-tools/ai-resume-analyzer'


       },
       {
              name: 'Career Roadmap Generator',
              desc: 'Build your roadmap',
              icon: '/roadmap.png',
              button: 'Generate Now',
              path: '/ai-tools/ai-roadmap-agent'
       },


];
const AiToolsList = () => {
       return (
              <div className="mt-7 p-5 bg-white border rounded-xl">
                     <h2 className="font-bold text-lg">Available AI Tools</h2>
                     <p>Start Building and Shape Your Career with this exclusive AI Tools</p>


                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-4">
                            {aiToolsList.map((tool, index) => (
                                   <AiToolCard key={index} tool={tool} />
                            ))}
                     </div>



              </div>
       );
};

export default AiToolsList;
