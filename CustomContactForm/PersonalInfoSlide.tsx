import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiMail, HiPhone, HiUser } from 'react-icons/hi'
import TextareaAutosize from 'react-textarea-autosize'
import { SpinnerCircular } from 'spinners-react'
import SwiperType from 'swiper'
import { SingleSelectAnswer } from './typings'

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
}

interface PersonalInfoSlideProps {
  title: string
  subtitle: string
  answers: SingleSelectAnswer[]
  swiperRef: SwiperType | null
  slideNext: () => void
}

const PersonalInfoSlide: FC<PersonalInfoSlideProps> = ({
  title,
  subtitle,
  answers,
  swiperRef,
  slideNext,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [submitting, setSubmitting] = useState(false)

  const onFormSubmit = async (formData: FormValues) => {
    setSubmitting(true)

    const formattedAnswers = answers.map((answer, index) => ({
      question: answer.question,
      answer: answers[index].answer.join(', '),
    }))

    try {
      const response = await fetch('/api/contact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, formattedAnswers }),
      })

      if (response.status === 200) {
        slideNext()
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log('error')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    swiperRef?.updateAutoHeight()
  }, [errors])

  return (
    <div className='w-full sm:p-1'>
      <div className='sm:text-center mb-10'>
        <p className='mt-2 text-2xl leading-8 font-extrabold tracking-tight title-color sm:text-3xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-base text-textcolor sm:mx-auto'>{subtitle}</p>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)} className='grid grid-cols-1 gap-y-6 max-w-2xl mx-auto'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-primary'>
            Name
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HiUser className='h-5 w-5 text-textcolor' aria-hidden='true' />
            </div>
            <input
              type='text'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Bitte geben Sie Ihren Namen ein.',
                },
                maxLength: { value: 100, message: 'Der Name kann nicht mehr als 100 Zeichen enthalten.' },
                onChange: () => swiperRef?.updateAutoHeight(),
                onBlur: () => swiperRef?.updateAutoHeight(),
              })}
              spellCheck={false}
              className={`placeholder-textcolor/80 text-textcolor focus:border-primary block w-full pl-10 sm:text-sm border-bordercolor bg-darkblue rounded-md ${
                errors.name && 'ring-1 ring-red-500'
              }`}
              placeholder='Max Mustermann'
            />
          </div>
          {errors?.name && <p className='text-sm text-red-500 pt-2'>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-primary'>
            E-Mail
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HiMail className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='text'
              {...register('email', {
                required: { value: true, message: 'Bitte geben Sie Ihre E-Mail ein.' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ungültige E-Mail Adresse.',
                },
                maxLength: { value: 100, message: 'Ihre E-Mail kann nicht mehr als 100 Zeichen enthalten.' },
                onChange: () => swiperRef?.updateAutoHeight(),
                onBlur: () => swiperRef?.updateAutoHeight(),
              })}
              spellCheck={false}
              className={`placeholder-textcolor/80 text-textcolor focus:border-primary block w-full pl-10 sm:text-sm border-bordercolor bg-darkblue rounded-md ${
                errors.email && 'ring-1 ring-red-500'
              }`}
              placeholder='max@mustermann.de'
            />
          </div>
          {errors?.email && <p className='text-sm text-red-500 pt-2'>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-primary'>
            Telefon (optional)
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HiPhone className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='text'
              {...register('phone', {
                maxLength: {
                  value: 25,
                  message: 'Ihre Telefonnummer kann nicht länger als 25 Zeichen sein.',
                },
                onChange: () => swiperRef?.updateAutoHeight(),
                onBlur: () => swiperRef?.updateAutoHeight(),
              })}
              spellCheck={false}
              className=' placeholder-textcolor/80 text-textcolor focus:border-primary block w-full pl-10 sm:text-sm border-bordercolor bg-darkblue rounded-md'
              placeholder='0171 123456'
            />
          </div>
        </div>
        <div>
          <label htmlFor='message' className='block text-sm font-medium text-primary mb-1'>
            Weitere Details zur Anfrage (optional)
          </label>
          <TextareaAutosize
            id='message'
            {...register('message', {
              maxLength: { value: 1000, message: 'Ihre Nachricht kann nicht länger als 1000 Zeichen sein.' },
            })}
            onHeightChange={() => swiperRef?.updateAutoHeight()}
            minRows={6}
            className='block w-full resize-none bg-darkblue border border-bordercolor shadow-sm py-3 px-4 placeholder-gray-500 text-textcolor focus:border-primary rounded-md'
          />
          {errors?.message && <p className='text-sm text-red-500 pt-2'>{errors.message.message}</p>}
        </div>
        <div className='w-full flex justify-center'>
          <button
            type='submit'
            className='inline-flex items-center text-primary border border-primary justify-center h-14 w-40 shadow-sm text-base font-medium rounded-md hover:bg-gray-800'>
            {submitting ? (
              <SpinnerCircular className='h-2/3' color='#38bdf8' secondaryColor='#353f4f' />
            ) : (
              'Senden'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoSlide
