import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import questions from '../questions'
import { SingleSelectAnswer } from '../typings'

interface SingleSelectProps {
  questionIndex: number
  answers: SingleSelectAnswer[]
  getImg: (img: string | JSX.Element) => JSX.Element
  setAnswers: Dispatch<SetStateAction<SingleSelectAnswer[]>>
  slideNext: () => void
}

const SingleSelect: FC<SingleSelectProps> = ({ questionIndex, answers, getImg, setAnswers, slideNext }) => {
  // Contant Definitions
  const { title, subtitle, options } = questions[questionIndex]

  // Action Handlers
  const handleSelection = (index: number) => {
    /**
     * If this question has already been answered, replace the existing answer
     * if not, push to array of answers
     */

    const alreadyAnsweredAtIndex = answers.findIndex((slide) => slide.question === title)
    const hasAlreadyBeenAnswered = alreadyAnsweredAtIndex !== -1
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
        copy[alreadyAnsweredAtIndex].answer = [chosenOption]

        return copy
      })
    }

    slideNext()
  }

  return (
    <div className='w-full'>
      <div className='sm:text-center'>
        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight title-color sm:text-4xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-xl text-color sm:mx-auto'>{subtitle}</p>
      </div>
      <dl className='sm:flex sm:flex-wrap sm:justify-center gap-10 mt-12 mb-2'>
        {options!.map((option, index) => {
          // Card should have the "selected card" style applied
          const isSelected = answers[questionIndex]?.answer.includes(option.caption)
          const img = getImg(option.img)

          return (
            <Fragment key={`answer-${index}`}>
              {/* Desktop answer */}
              <div
                onClick={() => handleSelection(index)}
                className={`hidden sm:flex desktop-card ${isSelected && 'desktop-card-selected'}`}>
                <dt className='order-2 sm:mt-2 text-lg leading-6 font-medium text-color'>{option.caption}</dt>
                <dd className='order-1 text-3xl sm:text-5xl font-extrabold text-indigo-600'>{img}</dd>
              </div>

              {/* Mobile answer */}
              <div
                onClick={() => handleSelection(index)}
                className={`sm:hidden mobile-card ${isSelected && 'mobile-card-selected '}`}>
                <dt className='order-2 sm:mt-2 text-lg leading-6 font-medium text-color'>{option.caption}</dt>
                <dd className='order-1 text-3xl sm:text-5xl font-extrabold text-indigo-600'>{img}</dd>
              </div>
            </Fragment>
          )
        })}
      </dl>
    </div>
  )
}

export default SingleSelect
