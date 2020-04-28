import { Sophy } from '../../../classes'
import { LocalAdapter } from './LocalAdapter'

/**
 * Make `Sophy` instance with `LocalAdapter`.
 *
 * @param path Root path.
 */
export const makeLocal = (path: string) => {
  return new Sophy(new LocalAdapter(path))
}
