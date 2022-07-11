import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

// import required modules
import { FC, useState } from 'react'
import SwiperType from 'swiper'
import ProgressBar from '../components/ProgressBar'
import questions from '../config/questions'
import { SingleSelectAnswer } from '../typings'
import PersonalInfoSlide from './PersonalInfoSlide'
import MultipleSelect from './questions/MultipleSelect'
import SingleSelect from './questions/SingleSelect'
import ThankYouPage from './ThankYouPage'

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = ({}) => {
  const [swiperRef, setSwiperRef] = useState<null | SwiperType>(null)
  const [progress, setProgress] = useState<undefined | number>(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const [answers, setAnswers] = useState<SingleSelectAnswer[]>([])
  console.log('answers', answers)

  const slideNext = () => {
    setCurrentSlideIndex((prev) => prev + 1)
    swiperRef?.slideNext()
  }

  const slidePrev = () => {
    setCurrentSlideIndex((prev) => prev - 1)
    swiperRef?.slidePrev()
  }

  const progressWithoutLastPage = Math.abs(currentSlideIndex / (questions.length - 2))
  const onThankYouPage = currentSlideIndex === questions.length - 1

  return (
    <div className='w-full rounded-lg bg-gray-100 p-6'>
      <div className='sm:p-4'>
        <Swiper
          centeredSlides={true}
          autoHeight={true}
          allowTouchMove={false}
          onSwiper={setSwiperRef}
          onSlideChange={() => setProgress(swiperRef?.progress)}>
          {questions.map((question, index) => {
            switch (question.type) {
              case 'single_select':
                return (
                  <SwiperSlide key={question.title}>
                    <SingleSelect
                      title={question.title}
                      subtitle={question.subtitle}
                      options={question.options}
                      questionIndex={index}
                      answers={answers}
                      setAnswers={setAnswers}
                      slideNext={slideNext}
                    />
                  </SwiperSlide>
                )
              case 'multiple_select':
                return (
                  <SwiperSlide key={question.title}>
                    <MultipleSelect
                      title={question.title}
                      subtitle={question.subtitle}
                      options={question.options}
                      questionIndex={index}
                      currentSlideIndex={currentSlideIndex}
                      answers={answers}
                      setAnswers={setAnswers}
                      slideNext={slideNext}
                      maxOptions={question.maxOptions}
                    />
                  </SwiperSlide>
                )
              case 'personal_info':
                return (
                  <SwiperSlide key={question.title}>
                    <PersonalInfoSlide
                      title={question.title}
                      subtitle={question.subtitle}
                      answers={answers}
                      slideNext={slideNext}
                    />
                  </SwiperSlide>
                )
              case 'thank_you':
                return (
                  <SwiperSlide key={question.title}>
                    <ThankYouPage title={question.title} subtitle={question.subtitle} />
                  </SwiperSlide>
                )
            }
          })}
        </Swiper>
      </div>

      {!onThankYouPage && (
        <div className='flex gap-6 items-center justify-center pt-8'>
          <button
            type='button'
            onClick={slidePrev}
            disabled={swiperRef?.isBeginning}
            className='inline-flex aspect-square transition items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <HiArrowSmLeft className='text-2xl' />
          </button>
          <div className='w-full'>
            {progress !== undefined && <ProgressBar percentFilled={progressWithoutLastPage} />}
          </div>
          <button
            type='button'
            onClick={slideNext}
            disabled={swiperRef?.isEnd || !answers[currentSlideIndex]}
            className='inline-flex aspect-square transition items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <HiArrowSmRight className='text-2xl' />
          </button>
        </div>
      )}
    </div>
  )
}

export default ContactForm
