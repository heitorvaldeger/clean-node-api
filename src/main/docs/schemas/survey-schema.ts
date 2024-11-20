export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    },
    date: {
      type: 'string'
    }
  }
}
