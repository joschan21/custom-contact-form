import { FC } from 'react'
import { HiCheck } from 'react-icons/hi'

interface ThankYouPageProps {
  title: string
  subtitle: string
}

const ThankYouPage: FC<ThankYouPageProps> = ({ title, subtitle }) => {
  return (
    <div className=''>
      <div className='sm:mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/20'>
        <HiCheck className='h-6 w-6 text-primary' aria-hidden='true' />
      </div>
      <div className='sm:text-center mt-4'>
        <p className='mt-2 text-2xl leading-8 font-extrabold tracking-tight title-color sm:text-3xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-base text-textcolor sm:mx-auto'>{subtitle}</p>
      </div>
    </div>
  )
}

export default ThankYouPage
