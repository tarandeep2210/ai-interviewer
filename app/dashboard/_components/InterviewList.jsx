'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import db from '@/utils/db'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {

    const {user} = useUser()

    const [interviews, setInterviews] = useState([])

    useEffect(() => {
        console.log(user)
        user&&getInterviews()
    }, [user])

    const getInterviews = async () => {
        const interviews = await db.query.MockInterview.findMany({
            where: eq(MockInterview.createdBy, user.primaryEmailAddress?.emailAddress)
        })
        console.log(interviews)
        setInterviews(interviews)
    }
  return (
    <div>
        <h2 className='text-2xl font-medium'>Previous Interviews: {interviews.length}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {interviews && interviews.map((interview) => (
                <InterviewItemCard key={interview.id} interview={interview}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList