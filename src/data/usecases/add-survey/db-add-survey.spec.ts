import MockDate from 'mockdate'
import { IAddSurvey, AddSurveyModel, IAddSurveyRepository } from './db-add-survey-interfaces'
import { DbAddSurvey } from './db-add-survey'
class AddSurveyRepositoryStub implements IAddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
  }
}

type SutTypes = {
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

const fakeSurveyData: AddSurveyModel = {
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  createdAt: new Date()
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should calls AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(fakeSurveyData)

    expect(addSpy).toHaveBeenCalledWith(fakeSurveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const promise = sut.add(fakeSurveyData)

    await expect(promise).rejects.toThrow()
  })
})
