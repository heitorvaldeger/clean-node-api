import { ILogErrorRepository } from '#data/interfaces/db/log/log-error-repository'
import { mockLogErrorRepository } from '#data/test'
import { ok, serverError } from '#presentation/helpers/http/http-helpers'
import { HttpResponse } from '#presentation/helpers/http/interfaces/http'
import { IController } from '../../interfaces/controller'
import { LogControllerDecorator } from './log-controller-decorator'

class ControllerStub implements IController {
  async handle (request: LogControllerDecorator.Request): Promise<HttpResponse> {
    return await Promise.resolve({
      statusCode: 200,
      body: {
        any_field_one: 'any_value'
      }
    })
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepository: ILogErrorRepository
}
const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const logErrorRepository = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepository)

  return {
    controllerStub,
    sut,
    logErrorRepository
  }
}

const fakeRequest = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
}

const fakeResponse = {
  any_field_one: 'any_value'
}

const fakeError = new Error()
fakeError.stack = 'any_stack'

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle({
      body: fakeRequest
    })
    expect(handleSpy).toHaveBeenCalledWith({
      body: fakeRequest
    })
  })

  test('Should returns the same values of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(ok(fakeResponse))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error ', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()

    const logSpy = jest.spyOn(logErrorRepository, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(serverError(fakeError)))
    await sut.handle({
      body: fakeRequest
    })

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })

  test('Should log an empty string when controller returns 500 with null stack', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()

    const logSpy = jest.spyOn(logErrorRepository, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve({
      statusCode: 500,
      body: {
        stack: null
      }
    }))

    await sut.handle({
      body: fakeRequest
    })

    expect(logSpy).toHaveBeenCalledWith('')
  })
})
