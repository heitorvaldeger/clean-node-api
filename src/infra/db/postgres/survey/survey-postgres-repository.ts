import { AddSurveyModel, IAddSurveyRepository } from '#data/usecases/add-survey/db-add-survey-interfaces'
import { ILoadSurveysRepository, SurveyModel } from '#data/usecases/load-surveys/db-load-surveys-interfaces'
import { PostgresHelper } from '../helpers/postgres-helper'

export class SurveyPostgresRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const insertedRows = await PostgresHelper.getTable('surveys').insert({
      question: surveyData.question,
      createdAt: surveyData.createdAt
    }).returning('*')

    if (!(insertedRows.length > 0)) {
      throw new Error('Add survey failure!')
    }

    const answersToInsert = surveyData.answers.map(answer => ({
      ...answer,
      survey_id: insertedRows[0].id
    }))
    await PostgresHelper.getTable('answers').insert(answersToInsert)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveys = await PostgresHelper.getTable('surveys').leftJoin('answers', 'survey_id', '=', 'surveys.id').orderBy('surveys.id').select().returning<SurveyModel[]>('*')
    return surveys
  }
}
