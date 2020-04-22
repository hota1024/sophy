import { PromiseOr } from '../../types/PromiseOr'

/*
 * Sophy interface.
 */
export interface SophyInterface {
  /**
   * Write a new file.
   *
   * @param path
   * @param contents
   */
  write(path: string, contents: string): PromiseOr
}
