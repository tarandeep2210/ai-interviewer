'use client'
import React, { useEffect } from 'react'
import db from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { use } from 'react'
import { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
    const { interviewId } = use(params);
    const [feedback, setFeedback] = useState([])
    const router = useRouter()
    const [overallRating, setOverallRating] = useState(0)
    useEffect(() => {
        getFeedback()

    }, [])

    useEffect(() => {
        getOverallRating()

    }, [feedback])


    const getFeedback = async () => {
        const response = await db.query.UserAnswer.findMany({
            where: eq(UserAnswer.mockId, interviewId)
        })
        setFeedback(response)
    }

    const getOverallRating = () => {
        const totalRating = feedback.reduce((acc, curr) => acc + Number(curr.rating), 0)
        console.log(totalRating)
        console.log(feedback.length)
        setOverallRating((totalRating / feedback.length).toFixed(1))
    }
    return (
        <div className='p-10'>
            <h2 className='text-3xl font-bold text-green-500'>Congratulations! You have completed the interview.</h2>
            <h3 className='text-2xl font-bold'>Here is your feedback</h3>

            {feedback?.length === 0 ?
                <h2 className='text-primary text-lg my-3'>No feedback found</h2>
                :
                <>


                    <h2 className='text-primary text-lg my-3'>Your overall rating is <strong className='text-green-500'>{overallRating}/5</strong></h2>
                    <h2 className='text-sm text-gray-500 my-3'>Find your feedback for each question below</h2>

                    {feedback && feedback.map((item, index) => (
                        <Collapsible key={index}>
                            <CollapsibleTrigger className='text-sm text-gray-500 my-3 bg-secondary p-2 rounded-md flex justify-between items-center'>{item.question} <ChevronsUpDown className='w-4 h-4'></ChevronsUpDown></CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-sm text-red-500 p-2 border rounded-lg'>Rating: <strong>{item.rating}</strong></h2>
                                    <h2 className='text-sm text-gray-500 p-2 border rounded-lg'>Your Answer: {item.userAns}</h2>
                                    <h2 className='text-sm text-gray-500 p-2 border rounded-lg'>Correct Answer: {item.correctAns}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}
                </>}
            <Button className='mt-5' onClick={() => router.push('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback