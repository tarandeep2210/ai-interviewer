'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import db  from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { use } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
function StartInterview({ params }) {

    const { interviewId } = use(params);
    const [interviewDetails, setInterviewDetails] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        getInterviewdetails()
    }, [])

    const getInterviewdetails = async () => {
        const resp = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId))
        console.log(resp);
        setInterviewDetails(resp[0]);
        const jsonMockResp = JSON.parse(resp[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestions(jsonMockResp);
    }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Questions Section */}
            <QuestionsSection 
            mockInterviewQuestions={mockInterviewQuestions} 
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video Recording */}
         <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions} 
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
          />
            
        </div>

        <div className='flex justify-end gap-4'>
           {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
           {activeQuestionIndex < mockInterviewQuestions?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
           {activeQuestionIndex === mockInterviewQuestions?.length - 1 && <Button onClick={() => router.push(`/dashboard/interview/${interviewId}/feedback`)}>End Interview</Button>}
        </div>
    </div>
  )
}

export default StartInterview