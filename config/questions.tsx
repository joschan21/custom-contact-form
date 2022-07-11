import { AiOutlineQuestion, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { HiCheck, HiX } from 'react-icons/hi'

const questions = [
  {
    type: 'single_select',
    title: 'Ist eine Bühne vorhanden?',
    subtitle: 'Ist an dem Ort des gewünschten Auftrittes bereits eine Bühne oder Vergleichbares vorhanden.',
    options: [
      {
        img: <HiCheck />,
        caption: 'Ja',
      },
      {
        img: <HiX />,
        caption: 'Nein',
      },
      {
        img: <AiOutlineQuestion />,
        caption: 'Weiß ich nicht',
      },
    ],
  },
  {
    type: 'single_select',
    title: 'Wie groß ist das Publikum?',
    subtitle: '',
    options: [
      {
        img: <AiOutlineUser />,
        caption: 'Weniger als 20',
      },
      {
        img: <AiOutlineUserAdd />,
        caption: '20 - 100 Personen',
      },
      {
        img: <AiOutlineUsergroupAdd />,
        caption: '100+ Personen',
      },
      {
        img: <AiOutlineQuestion />,
        caption: 'Weiß ich nicht',
      },
    ],
  },
  {
    type: 'multiple_select',
    title: 'Wer ist anwesend?',
    maxOptions: 2,
    subtitle: 'lorem ipsum',
    options: [
      {
        img: '',
        caption: 'Kinder',
      },
      {
        img: '',
        caption: 'Erwachsene',
      },
      {
        img: '',
        caption: 'Senioren',
      },
    ],
  },
  {
    type: 'multiple_select',
    title: 'Wer ist nice?',
    subtitle: 'lorem ipsum',
    options: [
      {
        img: '',
        caption: 'Kinder',
      },
      {
        img: '',
        caption: 'Erwachsene',
      },
      {
        img: '',
        caption: 'Senioren',
      },
    ],
  },
  {
    type: 'personal_info',
    title: 'Weitere Angaben',
    subtitle: 'lorem ipsum',
  },
  {
    type: 'thank_you',
    title: 'Vielen Dank für Ihre Nachricht!',
    subtitle:
      'Ihre Nachricht wurde erfolgreich zugestellt. Wir werden uns schnellstmöglich bei Ihnen melden.',
  },
]

export default questions
