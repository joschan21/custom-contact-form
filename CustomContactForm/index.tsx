import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

// import required modules
import { FC, useRef, useState } from 'react'
import SwiperType from 'swiper'
import ProgressBar from './ProgressBar'
import questions from './questions'
import { SingleSelectAnswer } from './typings'
import PersonalInfoSlide from './PersonalInfoSlide'
import MultipleSelect from './slides/MultipleSelect'
import SingleSelect from './slides/SingleSelect'
import ThankYouPage from './ThankYouPage'
import Image from 'next/image'

const ContactForm: FC = () => {
  const [swiperRef, setSwiperRef] = useState<null | SwiperType>(null)
  const [progress, setProgress] = useState<undefined | number>(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const swiperSectionRef = useRef<null | HTMLDivElement>(null)

  const [answers, setAnswers] = useState<SingleSelectAnswer[]>([])
  console.log("answers", answers)

  const slideNext = () => {
    setCurrentSlideIndex((prev) => prev + 1)
    swiperRef?.slideNext()
  }

  const slidePrev = () => {
    setCurrentSlideIndex((prev) => prev - 1)
    swiperRef?.slidePrev()
  }

  const getImg = (img: string | JSX.Element) => {
    /**
     * img is either url or JSX Icon
     */
    if (typeof img === 'string') {
      return (
        <div className='relative w-12 h-12 sm:w-16 sm:h-16' aria-hidden='true'>
          <Image
            lazyRoot={swiperSectionRef}
            loading='eager'
            src={img}
            layout='responsive'
            height={128}
            width={128}
            alt='decorative_icon'
          />
        </div>
      )
    } else
      return (
        <div aria-hidden='true' className='w-16 h-16 flex justify-center items-center'>
          {img}
        </div>
      )
  }

  const progressWithoutLastPage = Math.abs(currentSlideIndex / (questions.length - 2))
  const onThankYouPage = currentSlideIndex === questions.length - 1

  return (
    <div className='overflow-hidden rounded-lg contact-form-background p-6'>
      <div ref={swiperSectionRef} className='sm:p-4'>
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
                  <SwiperSlide key={question.title} className='contact-form-background'>
                    {/* className to override overflowing shadows */}
                    <SingleSelect
                      questionIndex={index}
                      answers={answers}
                      getImg={getImg}
                      setAnswers={setAnswers}
                      slideNext={slideNext}
                    />
                  </SwiperSlide>
                )
              case 'multiple_select':
                return (
                  <SwiperSlide key={question.title} className='contact-form-background'>
                    <MultipleSelect
                      questionIndex={index}
                      answers={answers}
                      getImg={getImg}
                      setAnswers={setAnswers}
                      slideNext={slideNext}
                    />
                  </SwiperSlide>
                )
              case 'personal_info':
                return (
                  <SwiperSlide key={question.title} className='contact-form-background'>
                    <PersonalInfoSlide
                      title={question.title}
                      subtitle={question.subtitle}
                      answers={answers}
                      swiperRef={swiperRef}
                      slideNext={slideNext}
                    />
                  </SwiperSlide>
                )
              case 'thank_you':
                return (
                  <SwiperSlide key={question.title} className='contact-form-background'>
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
            className='inline-flex aspect-square transition items-center p-3 sm:p-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <HiArrowSmLeft className='text-white text-3xl sm:text-2xl' />
          </button>
          <div className='w-full'>
            {progress !== undefined && <ProgressBar percentFilled={progressWithoutLastPage} />}
          </div>
          <button
            type='button'
            onClick={slideNext}
            disabled={swiperRef?.isEnd || !answers[currentSlideIndex]}
            className='inline-flex aspect-square transition items-center p-3 sm:p-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <HiArrowSmRight className='text-white text-3xl sm:text-2xl' />
          </button>
        </div>
      )}
    </div>
  )
}

export default ContactForm
