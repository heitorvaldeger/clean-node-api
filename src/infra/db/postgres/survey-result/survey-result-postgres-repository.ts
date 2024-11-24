import { ISaveSurveyResultRepository, SaveSurveyResultParams, SurveyResultModel } from '#data/usecases/survey-result/save-survey-result/db-save-survey-result-interfaces'
import { PostgresHelper } from '../helpers/postgres-helper'
import moment from 'moment'

export class SurveyResultPostgresRepository implements ISaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    await PostgresHelper.getTable('survey_results')
      .insert({
        account_id: data.accountId,
        survey_id: data.surveyId,
        answer: data.answer,
        date: data.date
      })
      .onConflict(['survey_id', 'account_id'])
      .merge(['answer', 'date'])

    const surveyResults = await PostgresHelper.client.with('total_answers', (qb) => qb.table('survey_results')
      .where('survey_id', data.surveyId)
      .select([
        PostgresHelper.raw('COUNT(1) AS total')
      ]))
      .with('counter_answers', (qb) => qb.table('answers')
        .innerJoin('surveys', 'surveys.id', 'answers.survey_id')
        .leftJoin('survey_results', (join) => {
          join.on('survey_results.survey_id', 'answers.survey_id')
            .andOn('survey_results.answer', 'answers.answer')
        })
        .groupBy(['answers.survey_id', 'answers.answer', 'surveys.question', 'surveys.createdAt'])
        .select([
          'answers.survey_id',
          'answers.answer',
          'surveys.question',
          'surveys.createdAt as date',
          PostgresHelper.raw('COALESCE(COUNT(survey_results.answer), 0) AS count')
        ]))
      .from('counter_answers')
      .crossJoin('total_answers', () => {})
      .orderBy('counter_answers.count', 'desc')
      .select([
        'counter_answers.survey_id',
        'counter_answers.answer',
        'counter_answers.count',
        'counter_answers.question',
        'counter_answers.date',
        PostgresHelper.raw('(counter_answers.count * 100 / total_answers.total) AS percent')
      ])

    return this.groupSurveyAnswers(surveyResults)
  }

  private groupSurveyAnswers (answers: any[]): SurveyResultModel {
    const items = answers.reduce((acc, item) => {
      const { survey_id, question, answer, count, percent, date } = item

      const key = `${survey_id}-${question}`

      if (!acc[key]) {
        acc[key] = {
          survey_id,
          question,
          date: moment(date).format('YYYY-MM-DD h:mm:ss'),
          answers: []
        }
      }

      acc[key].answers.push({ answer, count, percent })

      return acc
    }, {})

    return Object.values(items)[0] as SurveyResultModel
  }
}
