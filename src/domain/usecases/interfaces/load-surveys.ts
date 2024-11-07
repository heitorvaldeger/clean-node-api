import { SurveyModel } from '../../model/survey'

export interface ILoadSurveys {
  load: () => Promise<SurveyModel[]>
}
