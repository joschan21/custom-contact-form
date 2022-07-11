import { FC } from 'react'
import { HiCheck } from 'react-icons/hi'

interface ThankYouPageProps {
  title: string
  subtitle: string
}

const ThankYouPage: FC<ThankYouPageProps> = ({ title, subtitle }) => {
  return (
    <div>
      <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100'>
        <HiCheck className='h-6 w-6 text-indigo-600' aria-hidden='true' />
      </div>
      <div className='sm:text-center'>
        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-xl text-gray-500 sm:mx-auto'>{subtitle}</p>
      </div>
    </div>
  )
}

export default ThankYouPage
