import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({interview}) {
    const router = useRouter()

  return (
    <div className='border shadow-sm rounded-lg p-3 my-5'>
        <h2 className='text-primary font-bold'>{interview?.jobPosition.toUpperCase()}</h2>
        <p className='text-sm text-gray-500'>{interview?.createdAt.toLocaleDateString()}</p>
        <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</p>

        </div>
        <div className='flex justify-between gap-2'>
            <Button variant='outline' size='sm' onClick={()=>router.push(`/dashboard/interview/${interview?.mockId}/feedback`)} className='mt-2 w-full'>Feedback</Button>
            <Button onClick={()=>router.push(`/dashboard/interview/${interview?.mockId}`)} size='sm' className='mt-2 w-full'>Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard