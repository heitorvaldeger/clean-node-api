import { ISurveyModel } from '../../model/survey'

export interface ILoadSurveys {
  load: () => Promise<ISurveyModel[]>
}
