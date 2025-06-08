import React from 'react';
import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';
import { ReactFlowProvider } from 'reactflow';




const nodeTypes = {
       turbo: TurboNode
}
// function RoadmapCanvas({ initialNodes, initialEdges }: any) {

//        return (
//               <div style={{ width: '100%', height: '100%' }}>
//                      <ReactFlowProvider>
//                             <ReactFlow
//                                    nodes={initialNodes
//                                    }
//                                    edges={initialEdges}
//                                    nodeTypes={nodeTypes}
//                                    style={{ width: '100%', height: '80vh', border: '1px solid black' }}
//                             >
//                                    <Controls />
//                                    <MiniMap />
//                                    {/* @ts-ignore */}
//                                    <Background variant="dots" gap={12} size={1} />
//                             </ReactFlow>
//                      </ReactFlowProvider>



//               </div>
//        )
// }
function RoadmapCanvas({ initialNodes = [], initialEdges = [] }: any) {
       const spacedNodes = initialNodes.map((node: any) => ({
              ...node,
              position: {
                     x: node.position.x * 2.0, // Wider horizontal spacing
                     y: node.position.y * 2.5, // Taller vertical spacing
              },
       }));

       return (
              <div style={{ width: '100%', height: '100%' }}>
                     <ReactFlowProvider>
                            <ReactFlow
                                   nodes={spacedNodes}
                                   edges={initialEdges}
                                   nodeTypes={nodeTypes}
                                   style={{ width: '100%', height: '80vh', border: '1px solid black' }}
                            >
                                   <Controls />
                                   <MiniMap />
                                   {/* @ts-ignore */}
                                   <Background variant="dots" gap={12} size={1} />
                            </ReactFlow>
                     </ReactFlowProvider>
              </div>
       );
}


export default RoadmapCanvas
