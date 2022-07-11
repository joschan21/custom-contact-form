export interface option {
  img: string | JSX.Element // link to img url or JSX Icon
  caption: string
}

export interface SingleSelectAnswer {
  question: string
  answer: string[]
}
