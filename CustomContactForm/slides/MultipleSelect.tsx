import { Dispatch, FC, Fragment, SetStateAction, useEffect } from 'react'
import questions from '../questions'
import { option, SingleSelectAnswer } from '../typings'

interface MultipleSelectProps {
  questionIndex: number // Index of question currently being shown to user
  answers: SingleSelectAnswer[]
  getImg: (img: string | JSX.Element) => JSX.Element
  setAnswers: Dispatch<SetStateAction<SingleSelectAnswer[]>>
  slideNext: () => void
}

const MultipleSelect: FC<MultipleSelectProps> = ({
  questionIndex,
  answers,
  getImg,
  setAnswers,
  slideNext,
}) => {
  // Constant Definitions
  const options: option[] | undefined = questions[questionIndex].options
  const { title, subtitle, maxOptions = options?.length } = questions[questionIndex]
  const amountOptionsSelected = answers[questionIndex]?.answer?.length

  // Action Handlers
  const handleSelection = (index: number) => {
    /**
     * If question was not answered, simply add to array
     * If question was answered but caption was not selected as one of the answers, simply add to array of selected answers
     * If question was answered and already selected (is being unselected), remove from array of selected answers
     */

    // If question has not been answered yet, add to array. Else, replace existing answer.
    const alreadyAnsweredAtIndex = answers.findIndex((slide) => slide.question === title)
    const hasAlreadyBeenAnswered = alreadyAnsweredAtIndex !== -1

    if (!hasAlreadyBeenAnswered && options) {
      setAnswers((prev) => [
        ...prev,
        {
          question: title,
          answer: [options[index].caption],
        },
      ])
    } else if (hasAlreadyBeenAnswered && options) {
      // make copy of previous answer array
      const prevAnswer = answers[questionIndex].answer

      // determine if this answer was selected before
      const wasSelected = prevAnswer.includes(options[index].caption)

      if (!wasSelected) {
        setAnswers((prev) => {
          let copy = [...prev]
          let prevAnswer = { ...copy[questionIndex] }
          prevAnswer.answer = [...prevAnswer.answer, options[index].caption]

          copy[questionIndex] = prevAnswer
          return copy
        })
      } else if (wasSelected) {
        setAnswers((prev) => {
          let copy = [...prev]
          let prevAnswer = { ...copy[questionIndex] }
          prevAnswer.answer = prevAnswer.answer.filter((caption) => caption !== options[index].caption)

          copy[questionIndex] = prevAnswer
          return copy
        })
      }
    }
  }

  /**
   * If all options have been checked || max no. of options are checked, switch to next slide
   */

  useEffect(() => {
    const submit = amountOptionsSelected === maxOptions
    if (submit) slideNext()
  }, [amountOptionsSelected])

  return (
    <div className='w-full'>
      <div className='sm:text-center'>
        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight title-color sm:text-4xl'>
          {title}
        </p>
        <p className='mt-4 max-w-2xl text-xl text-color sm:mx-auto'>{subtitle}</p>
      </div>
      <dl className='sm:flex sm:flex-wrap sm:justify-center gap-10 mt-12 mb-2'>
        {options?.map((option, index) => {
          // Card should have the "selected card" style applied
          const isSelected = answers[questionIndex]?.answer.includes(options[index].caption)
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
      <p className='text-sm text-color text-center pt-2'>Mehrfachauswahl möglich.</p>
    </div>
  )
}

export default MultipleSelect
