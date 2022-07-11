const questions = [
  {
    type: 'single_select',
    title: 'Ist eine Bühne vorhanden?',
    subtitle: 'lorem ipsum',
    options: [
      {
        img: '',
        caption: 'Ja',
      },
      {
        img: '',
        caption: 'Nein',
      },
      {
        img: '',
        caption: 'Weiß ich nicht',
      },
    ],
  },
  {
    type: 'single_select',
    title: 'question2',
    subtitle: 'lorem ipsum',
    options: [
      {
        img: '',
        caption: 'Weiter gehts',
      },
      {
        img: '',
        caption: 'Weiter gehts',
      },
      {
        img: '',
        caption: 'Weiter gehts',
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
