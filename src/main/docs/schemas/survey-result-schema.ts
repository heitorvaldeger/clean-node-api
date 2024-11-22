export const surveyResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    surveyId: {
      type: 'integer'
    },
    accountId: {
      type: 'integer'
    },
    answer: {
      type: 'string'
    },
    date: {
      type: 'string'
    }
  }
}
