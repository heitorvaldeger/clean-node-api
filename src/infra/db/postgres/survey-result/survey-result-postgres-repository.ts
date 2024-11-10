import { ISaveSurveyResultRepository, SaveSurveyResultModel, SurveyResultModel } from '#data/usecases/save-survey-result/db-save-survey-result-interfaces'
import { PostgresHelper } from '../helpers/postgres-helper'

export class SurveyResultPostgresRepository implements ISaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel | null> {
    await PostgresHelper.getTable('survey_results')
      .insert({
        account_id: data.accountId,
        survey_id: data.surveyId,
        answer: data.answer,
        date: data.date
      })
      .onConflict(['survey_id', 'account_id'])
      .merge(['answer', 'date'])

    const surveyResult = await PostgresHelper.getTable('survey_results')
      .where('survey_id', data.surveyId)
      .where('account_id', data.accountId)
      .first<SurveyResultModel | null>('*')

    return surveyResult
  }
}
