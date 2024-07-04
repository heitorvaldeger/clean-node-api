import { LogControllerDecorator } from '../../../../../presentation/controllers/decorators/log-controller-decorator'
import { IController } from '../../../../../presentation/controllers/interfaces/controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { LogPostgresRepository } from '../../../../../infra/db/postgres/log/log-postgres-repository'
import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeDbAddSurveyFactory } from '../../../usecases/db-add-survey/db-add-survey-factory'

export const makeAddSurveyFactory = (): IController => {
  return new LogControllerDecorator(new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurveyFactory()), new LogPostgresRepository())
}
