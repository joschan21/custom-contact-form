import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { option, SingleSelectAnswer } from '../../typings'

interface MultipleSelectProps {
  title: string
  subtitle: string
  options?: option[]
  questionIndex: number // Index of question currently being shown to user
  answers: SingleSelectAnswer[]
  currentSlideIndex: number
  setAnswers: Dispatch<SetStateAction<SingleSelectAnswer[]>>
  slideNext: () => void
  maxOptions?: number
}

const MultipleSelect: FC<MultipleSelectProps> = ({
  title,
  subtitle,
  options,
  questionIndex: currentQuestionIndex,
  answers,
  currentSlideIndex,
  setAnswers,
  slideNext,
  maxOptions = options!.length,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

  const handleSelection = (index: number) => {
    /**
     * For now, remember all selected answers.
     * If option was not checked previously, add to array of selected indexes
     * If option was checked previously and is being unchecked, remove from array of selected indexes
     */

    setSelectedIndices((prev) => {
      if (prev.includes(index)) return [...prev.filter((i) => i !== index)]
      return [...prev, index]
    })
  }

  useEffect(() => {
    if (currentSlideIndex === currentQuestionIndex) {
      const selectedOptions = options!.filter((_, index) => selectedIndices.includes(index))
      const selectedCaptions = selectedOptions.map((option) => option.caption)

      // If question has not been answered yet, add to array. Else, replace existing answer.
      const questionIndex = answers.findIndex((slide) => slide.question === title)
      const hasAlreadyBeenAnswered = questionIndex !== -1

      if (!hasAlreadyBeenAnswered) {
        setAnswers((prev) => [
          ...prev,
          {
            question: title,
            answer: selectedCaptions,
          },
        ])
      } else if (hasAlreadyBeenAnswered) {
        setAnswers((prev) => {
          let copy = prev
          copy[questionIndex].answer = selectedCaptions

          return copy
        })
      }
    }
  }, [selectedIndices])

  /**
   * If all options have been checked || max no. of options are checked, switch to next slide
   */

  useEffect(() => {
    const submit = selectedIndices.length === maxOptions
    if (submit) slideNext()
  }, [selectedIndices])

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
          const isSelected = selectedIndices.includes(index)
          return (
            <div
              key={`option-${index}`}
              onClick={() => handleSelection(index)}
              className={`answerCardStyle ${isSelected && 'selectedAnswerStyle'}`}>
              <dt className='order-2 mt-2 text-lg leading-6 font-medium text-gray-500'>{option.caption}</dt>
              <dd className='order-1 text-5xl font-extrabold text-indigo-600'>100%</dd>
            </div>
          )
        })}
      </dl>
      <p className='text-sm text-gray-500 text-center pt-2'>Mehrfachauswahl möglich.</p>
    </div>
  )
}

export default MultipleSelect
