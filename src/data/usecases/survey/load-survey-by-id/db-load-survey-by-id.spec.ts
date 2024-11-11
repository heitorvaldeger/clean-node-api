import { ILoadSurveyByIdRepository, SurveyModel } from './db-load-survey-by-id-interfaces'
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
  async loadById (surveyId: number): Promise<SurveyModel> {
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
    await sut.loadById(0)

    expect(loadByIdSpy).toHaveBeenCalledWith(0)
  })

  test('Should return survey on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById(0)

    expect(surveys).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const promise = sut.loadById(0)

    await expect(promise).rejects.toThrow()
  })
})
