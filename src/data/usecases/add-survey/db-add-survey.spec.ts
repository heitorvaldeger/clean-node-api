import { IAddSurvey, IAddSurveyModel, IAddSurveyRepository } from './db-add-survey-interfaces'
import { DbAddSurvey } from './db-add-survey'
class AddSurveyRepositoryStub implements IAddSurveyRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
  }
}

interface SutTypes {
  addSurveyRepositoryStub: IAddSurveyRepository
  sut: IAddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

const fakeSurveyData: IAddSurveyModel = {
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
}

describe('DbAddSurvey Usecase', () => {
  test('Should calls AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(fakeSurveyData)

    expect(addSpy).toHaveBeenCalledWith(fakeSurveyData)
  })
})
