import { Request, Response, NextFunction } from 'express'

/**
  Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
  Expires: 0
  Surrogate-Control: no-store
*/
export const noCache = (req: Request, res: Response, next: NextFunction): void => {
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  next()
}
