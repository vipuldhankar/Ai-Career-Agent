import { inngest } from "@/inngest/client";
import { getRuns } from "@/lib/inngest";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { roadmapId, userInput } = await req.json();
    const user = await currentUser()

   
    

    const resultIds = await inngest.send({
        name: 'AIRoadMapAgent',
        data: {
            userInput: userInput,
            roadmapId: roadmapId,
            userEmail: user?.primaryEmailAddress?.emailAddress
        }
    });





    const runId = resultIds?.ids[0];
    // Use polling to check run status
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


        return NextResponse.json(runStatus.data?.[0].output?.output[0]);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
        }
    }
}

