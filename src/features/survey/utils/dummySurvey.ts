const survey1 = [
  {
    question: {
      slider: {
        question: 'Slider type question 1 (min: 5, max: 20)',
        values: { max: 20, min: 5 },
      },
    },
    type: 'Slider',
  },
];

const survey2 = [
  {
    question: {
      openEnded: {
        question: 'Open-ended type question 1 (max length 50)',
        values: { maxLength: 50 },
      },
    },
    type: 'Open-ended Question',
  },
  {
    question: {
      choices: {
        multipleSelection: true,
        optionType: 'Button',
        question: 'Multiple choice type question (multiple selection | option type = button)',
        values: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Long long long long text'],
      },
    },
    type: 'Multiple Choice',
  },
];

const survey3 = [
  {
    question: {
      slider: {
        question: 'Slider type question 1 (min: 10, max: 200)',
        values: { max: 200, min: 10 },
      },
    },
    type: 'Slider',
  },
  {
    question: {
      slider: {
        question: 'Slider type question 2 (min: -5, max: 5)',
        values: { max: 5, min: -5 },
      },
    },
    type: 'Slider',
  },
  {
    question: {
      openEnded: {
        question: 'Open-ended type question 1 (max length 21)',
        values: { maxLength: 21 },
      },
    },
    type: 'Open-ended Question',
  },
  {
    question: {
      openEnded: {
        question: 'Open-ended type question 2 (max length 8)',
        values: { maxLength: 8 },
      },
    },
    type: 'Open-ended Question',
  },
  {
    question: {
      choices: {
        multipleSelection: false,
        optionType: 'Button',
        question: 'Multiple choice type question (single selection | option type = button)',
        values: ['Test1', 'Test2', 'Test3', 'Test4'],
      },
    },
    type: 'Multiple Choice',
  },
  {
    question: {
      choices: {
        multipleSelection: true,
        optionType: 'Button',
        question: 'Multiple choice type question (multiple selection | option type = button)',
        values: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Long long long long text'],
      },
    },
    type: 'Multiple Choice',
  },
  {
    question: {
      choices: {
        multipleSelection: false,
        optionType: 'Check Box',
        question: 'Multiple choice type question (single selection | option type = check box)',
        values: ['Yes', 'No'],
      },
    },
    type: 'Multiple Choice',
  },
  {
    question: {
      choices: {
        multipleSelection: true,
        optionType: 'Check Box',
        question: 'Multiple choice type question (multiple selection | option type = check box)',
        values: ['Black', 'White', 'Green', 'Red'],
      },
    },
    type: 'Multiple Choice',
  },

  {
    question: {
      choices: {
        multipleSelection: false,
        optionType: 'Radio Button',
        question: 'Multiple choice type question (single selection | option type = radio button)',
        values: ['choice 1', 'choice 2', 'choice 3'],
      },
    },
    type: 'Multiple Choice',
  },

  {
    question: {
      choices: {
        multipleSelection: false,
        optionType: 'Radio Button',
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo faucibus enim sed molestie. Duis eleifend sapien quis lorem vestibulum consequat. Sed mollis sapien eget mollis aliquet. Nunc dictum aliquam purus sit amet finibus. Nam ut magna sed ex scelerisque egestas. Proin consectetur, urna aliquam pulvinar pretium, orci ante tincidunt nunc, vitae euismod turpis lectus at lectus. Praesent pretium ligula dui, sit amet ornare felis congue eget. Pellentesque ullamcorper nisi neque. Mauris a turpis cursus, hendrerit odio quis, finibus enim. Pellentesque pulvinar risus eget iaculis aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In molestie. ',
        values: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida lacus risus, finibus sagittis nibh tristique vel. Vivamus sit amet. ',
          'Maecenas sagittis tellus eget elit sodales, posuere pellentesque leo imperdiet. Etiam accumsan. ',
          'Nam bibendum neque nec ante posuere ultricies. Mauris sed congue odio. Curabitur eget tristique dui. Aenean porttitor malesuada turpis, a. ',
          'Nullam euismod quam sed diam rutrum, ut vulputate ex blandit. Ut viverra non massa eu elementum. Nulla lobortis enim non. ',
          'Integer a turpis tortor. Curabitur ac quam rutrum, facilisis enim a, tincidunt quam. Ut elementum sit amet nulla in pharetra. ',
        ],
      },
    },
    type: 'Multiple Choice',
  },
];

export const dummySurveys = [
  { title: 'Test Survey 1', survey: survey1 },
  { title: 'Test Survey 2', survey: survey2 },
  { title: 'Test Survey 3', survey: survey3 },
];
