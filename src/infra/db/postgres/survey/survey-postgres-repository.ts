import { IAddSurveyModel, IAddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-interfaces'
import { PostgresHelper } from '../helpers/postgres-helper'

export class SurveyPostgresRepository implements IAddSurveyRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    await PostgresHelper.getTable('surveys').count()
    const insertedRows = await PostgresHelper.getTable('surveys').insert({
      question: surveyData.question
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
}
