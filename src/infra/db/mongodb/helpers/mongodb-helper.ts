import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: '',
  async connect (uri: string = ''): Promise<void> {
    if (!uri) {
      throw new Error('MongoDB uri is not defined')
    }
    this.client = await MongoClient.connect(uri)
    this.uri = uri
  },
  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }
}

export default MongoHelper
