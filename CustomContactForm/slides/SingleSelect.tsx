import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { option, SingleSelectAnswer } from '../typings'

interface SingleSelectProps {
  title: string
  subtitle: string
  options?: option[]
  questionIndex: number
  answers: SingleSelectAnswer[]
  setAnswers: Dispatch<SetStateAction<SingleSelectAnswer[]>>
  slideNext: () => void
}

const SingleSelect: FC<SingleSelectProps> = ({
  title,
  subtitle,
  options,
  questionIndex: currentQuestionIndex,
  answers,
  setAnswers,
  slideNext,
}) => {
  const handleSelection = (index: number) => {
    /**
     * If this question has already been answered, replace the existing answer
     * if not, push to array of answers
     */

    const questionIndex = answers.findIndex((slide) => slide.question === title)
    const hasAlreadyBeenAnswered = questionIndex !== -1
    const chosenOption = options![index].caption

    if (!hasAlreadyBeenAnswered) {
      setAnswers((prev) => [
        ...prev,
        {
          question: title,
          answer: [chosenOption],
        },
      ])
    } else if (hasAlreadyBeenAnswered) {
      setAnswers((prev) => {
        let copy = prev
        copy[questionIndex].answer = [chosenOption]

        return copy
      })
    }

    slideNext()
  }

  return (
    <div className='w-full'>
      <div className='sm:text-center'>
        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-xl text-gray-500 sm:mx-auto'>{subtitle}</p>
      </div>
      <dl className='sm:flex sm:flex-wrap sm:justify-center gap-10 mt-12 mb-2'>
        {options!.map((option, index) => {
          // Card should have the "selected card" style applied
          const isSelected = answers[currentQuestionIndex]?.answer.includes(option.caption)

          return (
            <Fragment key={`answer-${index}`}>
              {/* Desktop answer */}
              <div
                onClick={() => handleSelection(index)}
                className={`hidden sm:flex desktop-card ${isSelected && 'desktop-card-selected'}`}>
                <dt className='order-2 sm:mt-2 text-lg leading-6 font-medium text-gray-500'>
                  {option.caption}
                </dt>
                <dd className='order-1 text-3xl sm:text-5xl font-extrabold text-indigo-600'>{option.img}</dd>
              </div>

              {/* Mobile answer */}
              <div
                onClick={() => handleSelection(index)}
                className={`sm:hidden mobile-card ${isSelected && 'mobile-card-selected '}`}>
                <dt className='order-2 sm:mt-2 text-lg leading-6 font-medium text-gray-500'>
                  {option.caption}
                </dt>
                <dd className='order-1 text-3xl sm:text-5xl font-extrabold text-indigo-600'>{option.img}</dd>
              </div>
            </Fragment>
          )
        })}
      </dl>
    </div>
  )
}

export default SingleSelect
