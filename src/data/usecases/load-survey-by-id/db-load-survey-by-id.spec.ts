import { ILoadSurveyByIdRepository } from '#data/interfaces/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '#domain/model/survey'
import { DbLoadSurveyById } from './db-load-survey-by-id'

const createdAt = new Date()
const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  createdAt
})

class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
  async loadById (surveyId: string): Promise<SurveyModel> {
    return await new Promise(resolve => { resolve(makeFakeSurvey()) })
  }
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyById', () => {
  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return survey on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')

    expect(surveys).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const promise = sut.loadById('any_')

    await expect(promise).rejects.toThrow()
  })
})
