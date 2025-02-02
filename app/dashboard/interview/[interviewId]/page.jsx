'use client'
import React, { useEffect } from 'react'
import { use } from 'react'
import db from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useState } from 'react'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function Interview({ params }) {
    // Unwrap the params using React.use()
    const { interviewId } = use(params);

    const [interviewDetails, setInterviewDetails] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    useEffect(() => {
        getInterviewdetails()
    }, [])

    const getInterviewdetails = async () => {
        const resp = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId))
        console.log(resp);
        setInterviewDetails(resp[0]);
    }

    return (
        <div className='my-10 '>
            <h2 className='text-2xl font-bold mb-5'>Lets Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-5 gap-5 '>
                    <div className='flex flex-col gap-5 p-5 rounder-lg border'>
                    <h2 className='text-lg font-medium'><strong>Job Role/Job Position: </strong>{interviewDetails?.jobPosition.toUpperCase()}</h2>
                    <h2 className='text-lg font-medium'><strong>Job Description: </strong>{interviewDetails?.jobDescription.toUpperCase()}</h2>
                    <h2 className='text-lg font-medium'><strong>Job Experience: </strong>{interviewDetails?.jobExperience}</h2>
                    </div>
                    <div className='p-5 rounded-lg border border-yellow-300 bg-yellow-200'>
                        <h2 className='flex items-center gap-2'><Lightbulb className='h-10 w-10' /><strong>Information</strong></h2>
                        <h2>Enable your webcam and microphone to start the interview</h2>
                    </div>
                </div>

                <div>
                    {webcamEnabled ?
                        <Webcam
                            onUserMedia={() => setWebcamEnabled(true)}
                            onUserMediaError={() => setWebcamEnabled(false)}
                            mirrored={true}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                border: '1px solid #000'
                            }}
                        />
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant={'ghost'} className='my-5 w-full' onClick={() => setWebcamEnabled(true)}>Enable Webcam and Microphone</Button>
                        </>
                    }

                </div>
            </div>

            <div className='flex justify-end items-end'>
                <Link href={`/dashboard/interview/${interviewId}/start`}>
                    <Button className='my-5'>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview