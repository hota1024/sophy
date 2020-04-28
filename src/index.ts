import { makeLocal } from './impls'

export * from './abstracts'
export * from './impls'
export * from './interfaces'
export * from './types'

export default makeLocal(process.cwd())
