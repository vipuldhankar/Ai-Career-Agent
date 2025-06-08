// import { inngest } from "@/inngest/client";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(req: any) {
//     const { userInput } = await req.json();

//     const resultIds = await inngest.send({
//         name: 'AiCareerAgent',
//         data: {
//             userInput: userInput
//         }
//     });

//     const runId = resultIds?.ids[0];

//     let runStatus;
//     try {
//         while (true) {
//             runStatus = await getRuns(runId);
//             if (runStatus?.data?.length > 0 && runStatus?.data[0]?.status === 'Completed') {
//                 break;
//             }
//             console.log("Current run status:", runStatus);  // Optional: logging the status
//             await new Promise(resolve => setTimeout(resolve, 500));  // 500ms polling
//         }
//         console.log("done bhai")
//         console.log("Final runStatus data:", JSON.stringify(runStatus, null, 2));


//         return NextResponse.json(runStatus.data?.[0].output?.output[0]);
//     } catch (error) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         } else {
//             return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
//         }
//     }
// }

// export async function getRuns(runId: string) {
//     try {
//         const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
//             headers: {
//                 Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
//             }
//         });

//         if (result.status !== 200) {
//             throw new Error(`Unexpected status code: ${result.status}`);
//         }

//         return result.data;
//     } catch (error) {
//         console.error('Error fetching run status:', error);
//         throw new Error('Failed to fetch run status');
//     }
// }


// app/api/ai-career-chat-agent/route.ts

import { inngest } from "@/inngest/client";
import { getRuns } from "@/lib/inngest";  // import the helper
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userInput } = await req.json();

    const resultIds = await inngest.send({
        name: "AiCareerAgent",
        data: {
            userInput,
        },
    });

    const runId = resultIds?.ids[0];

    try {
        let runStatus;
        while (true) {
            runStatus = await getRuns(runId);
            if (runStatus?.data?.length > 0 && runStatus?.data[0]?.status === "Completed") {
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        return NextResponse.json(runStatus.data?.[0].output?.output[0]);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
        }
    }
}
