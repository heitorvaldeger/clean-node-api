import { IAddSurveyRepository } from '#data/usecases/survey/add-survey/db-add-survey-interfaces'
import { ILoadSurveysRepository, SurveyModel } from '#data/usecases/survey/load-surveys/db-load-surveys-interfaces'
import { AddSurveyParams } from '#domain/usecases/interfaces/survey/add-survey'
import { ILoadSurveyById } from '#domain/usecases/interfaces/survey/load-survey-by-id'
import { PostgresHelper } from '../helpers/postgres-helper'

export class SurveyPostgresRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyById {
  async add (surveyData: AddSurveyParams): Promise<void> {
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
    const surveys = await PostgresHelper.getTable('surveys')
      .leftJoin('answers', 'survey_id', '=', 'surveys.id')
      .orderBy('surveys.id')
      .select().returning<any[]>('*')
    return this.mapperSurveyList(surveys)
  }

  async loadById (surveyId: string): Promise<SurveyModel | null> {
    const surveys = await PostgresHelper.getTable('surveys')
      .leftJoin('answers', 'survey_id', '=', 'surveys.id')
      .where('surveys.id', surveyId)
      .orderBy('surveys.id')
      .select()
      .returning<any[]>('*')

    return this.mapperSurvey(surveys)
  }

  private mapperSurvey (surveys: any[]): SurveyModel | null {
    let survey: SurveyModel | null = null
    surveys.forEach(s => {
      if (!survey) {
        survey = {
          id: s.id,
          question: s.question,
          createdAt: s.createdAt,
          answers: []
        }
      }

      survey.answers.push({
        answer: s.answer
      })
    })

    return survey
  }

  private mapperSurveyList (surveys: any[]): SurveyModel[] {
    const newSurveys: SurveyModel[] = []
    surveys.forEach(s => {
      const ns = newSurveys.findIndex(ns => ns.id === s.survey_id)
      if (ns >= 0) {
        newSurveys[ns].answers.push({
          answer: s.answer
        })
      } else {
        newSurveys.push({
          id: s.survey_id,
          question: s.question,
          createdAt: s.createdAt,
          answers: s.answer
            ? [{
                answer: s.answer
              }]
            : []
        })
      }
    })

    return newSurveys
  }
}
