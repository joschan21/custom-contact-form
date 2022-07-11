import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { HiMail, HiPhone, HiUser } from 'react-icons/hi'
import { SingleSelectAnswer } from '../typings'

interface PersonalInfoSlideProps {
  title: string
  subtitle: string
  answers: SingleSelectAnswer[]
  slideNext: () => void
}

const PersonalInfoSlide: FC<PersonalInfoSlideProps> = ({ title, subtitle, answers, slideNext }) => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    /**
     * formattedAnswers: convert array of strings for each answer to human readable string concatenation
     * Before: {question: 'Question?', answer: ['Option 1', 'Option 2]}
     * After: {question: 'Question?', answer: 'Option 1, Option 2'}
     */

    const formattedAnswers = answers.map((answer, index) => ({
      question: answer.question,
      answer: answers[index].answer.join(', '),
    }))

    const { name, email } = input

    // Handle this data, for example send to E-Mail

    slideNext()
  }

  return (
    <div className='w-full p-1'>
      <div className='sm:text-center'>
        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-xl text-gray-500 sm:mx-auto'>{subtitle}</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='grid grid-cols-1 gap-y-6 max-w-2xl mx-auto'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HiUser className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='text'
              name='name'
              onChange={(e) => handleChange(e)}
              value={input.name}
              required
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
              placeholder='Max Mustermann'
            />
          </div>
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            E-Mail
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HiMail className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='email'
              name='email'
              onChange={(e) => handleChange(e)}
              value={input.email}
              required
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
              placeholder='max@mustermann.de'
            />
          </div>
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Telefon (optional)
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HiPhone className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='text'
              name='phone'
              onChange={(e) => handleChange(e)}
              value={input.phone}
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
              placeholder='0171 123456'
            />
          </div>
        </div>
        <div>
          <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
            Weitere Details zur Anfrage (optional)
          </label>
          <textarea
            id='message'
            name='message'
            onChange={(e) => handleChange(e)}
            value={input.message}
            rows={4}
            className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
          />
        </div>
        <div className='w-full flex justify-center'>
          <button
            type='submit'
            className='inline-flex justify-center py-3 px-12 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Senden
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoSlide
