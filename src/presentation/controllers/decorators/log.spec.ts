import { IController, IHttpRequest, IHttpResponse } from '../../interfaces'
import { LogControllerDecorator } from './log'

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
}
const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    controllerStub,
    sut
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
})
