import { PromiseOr } from '../../types/PromiseOr'
import { Stream } from 'stream'
import { File } from '../../impls/nodes/File'
import { Directory } from '../../impls/nodes/Directory'
import { Node } from '../../abstracts/Node'
import { AdapterInterface } from '../Adapter'

/*
 * Sophy interface.
 */
export interface SophyInterface {
  /**
   * Adapter instance.
   */
  readonly adapter: AdapterInterface

  /**
   * Check whether a file or directory exists.
   *
   * @param path Path to file or directory.
   */
  has(path: string): PromiseOr<boolean>

  /**
   * Ready a file.
   *
   * @param path Path to file.
   */
  read(path: string): PromiseOr<string>

  /**
   * Read a file using a stream.
   *
   * @param path Path to file.
   */
  readStream(path: string): Stream

  /**
   * List children of the directory.
   *
   * @param path Path to directory.
   */
  listChildren(path: string): PromiseOr<Node[]>

  /**
   * Get size of the file or directory.
   *
   * @param path Path to file or directory.
   */
  getSize(path: string): PromiseOr<number>

  /**
   * Get MIME type of the file.
   *
   * @param path Path to file.
   */
  getMime(path: string): PromiseOr<string | false>

  /**
   * Write a new file.
   *
   * @param path Path to file.
   * @param contents Write contents.
   */
  write(path: string, contents: string): PromiseOr<File>

  /**
   * Write a new file using a stream.
   *
   * @param path Path to file.
   */
  writeStream(path: string): Stream

  /**
   * Update a file.
   *
   * @param path Path to file.
   * @param contents Contents.
   */
  update(path: string, contents: string): PromiseOr<File>

  /**
   * Update a file using a stream.
   *
   * @param path Path to file.
   */
  updateStream(path: string): Stream

  /**
   * Create or Update a file.
   *
   * @param path Path to file.
   * @param contents Put contents.
   */
  put(path: string, contents: string): PromiseOr<File>

  /**
   * Create or Update a file using a stream.
   *
   * @param path Path to file.
   */
  putStream(path: string): PromiseOr<Stream>

  /**
   * Append a contents to a file.
   *
   * @param path Path to file.
   * @param contents Append contents.
   */
  append(path: string, contents: string): PromiseOr<File>

  /**
   * Prepend a contents to a file.
   *
   * @param path Path to file.
   * @param contents Prepend contents.
   */
  prepend(path: string, contents: string): PromiseOr<File>

  /**
   * Move a file or directory.
   *
   * @param path Path to the file or directory.
   * @param newPath Move destination path.
   */
  move(path: string, newPath: string): PromiseOr<Node>

  /**
   * Copy a file.
   *
   * @param path Path to file.
   * @param newPath Copy destination path.
   */
  copy(path: string, newPath: string): PromiseOr<Node>

  /**
   * Delete a file or directory.
   *
   * @param path Path to file or directory.
   */
  delete(path: string): PromiseOr

  /**
   * Make directory.
   *
   * @param path Path to directory.
   */
  makeDirectory(path: string): PromiseOr<Directory>
}
