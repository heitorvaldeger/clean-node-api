import { ILogErrorRepository } from '../../../data/interfaces/log-error-repository'
import { serverError } from '../../helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse } from '../../interfaces'
import { LogControllerDecorator } from './log'

class LogErrorRepository implements ILogErrorRepository {
  async log (stack: string): Promise<void> {
    await new Promise((resolve) => { resolve(null) })
  }
}

class ControllerStub implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise(resolve => {
      resolve({
        statusCode: 200,
        body: {
          any_field_one: 'any_value'
        }
      })
    })
  }
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepository: ILogErrorRepository
}
const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const logErrorRepository = new LogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepository)

  return {
    controllerStub,
    sut,
    logErrorRepository
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest: IHttpRequest = {
      body: {
        any_field_one: 'any_value',
        any_field_two: 'any_value'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should returns the same values of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        any_field_one: 'any_value',
        any_field_two: 'any_value'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        any_field_one: 'any_value'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error ', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        any_field_one: 'any_value',
        any_field_two: 'any_value'
      }
    }

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    const logSpy = jest.spyOn(logErrorRepository, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => { resolve(serverError(fakeError)) }))
    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
