import { AdapterInterface, NodeMeta, FileMeta } from '../../interfaces/Adapter'
import { PromiseOr } from '../../types/PromiseOr'
import { Stream } from 'stream'
import * as path from 'path'
import { NodeType } from '../../types'

/*
 * Adapter abstract class.
 */
export abstract class Adapter implements AdapterInterface {
  /**
   * Root path.
   */
  readonly root: string

  /**
   * Adapter constructor.
   *
   * @param root Root path.
   */
  constructor(root: string) {
    this.root = root
  }

  /**
   * Resolve root path and paths.
   *
   * @param paths Paths.
   */
  protected resolve(...paths: string[]) {
    return path.join(this.root, ...paths)
  }

  /**
   * Check whether a file or directory exists.
   *
   * @param path Path to file or directory.
   */
  abstract has(path: string): PromiseOr<boolean>

  /**
   * Read a file.
   *
   * @param path Path to file.
   */
  abstract read(path: string): PromiseOr<string>

  /**
   * Read a file using a stream.
   *
   * @param path Path to file.
   */
  abstract readStream(path: string): Stream

  /**
   * List children of the directory.
   *
   * @param path Path to directory.
   */
  abstract listChildren(path: string): PromiseOr<NodeMeta[]>

  /**
   * Get size of the file or directory.
   *
   * @param path Path to file or directory.
   */
  abstract getSize(path: string): PromiseOr<number>

  /**
   * Get MIME type of the file.
   *
   * @param path Path to file.
   */
  abstract getMime(path: string): PromiseOr<string | false>

  /**
   * Write a new file.
   *
   * @param path Path to file.
   * @param contents Write contents.
   */
  abstract write(
    path: string,
    contents: string
  ): PromiseOr<NodeMeta & { type: NodeType.File }>

  /**
   * Write a new file using a stream.
   *
   * @param path Path to file.
   */
  abstract writeStream(path: string): Stream

  /**
   * Update a file.
   *
   * @param path Path to file.
   * @param contents Contents.
   */
  abstract update(path: string, contents: string): PromiseOr<FileMeta>

  /**
   * Update a file using a stream.
   *
   * @param path Path to file.
   */
  abstract updateStream(path: string): Stream

  /**
   * Create or Update a file.
   *
   * @param path Path to file.
   * @param contents Put contents.
   */
  abstract put(path: string, contents: string): PromiseOr<FileMeta>

  /**
   * Create or Update a file using a stream.
   *
   * @param path Path to file.
   */
  abstract putStream(path: string): PromiseOr<Stream>

  /**
   * Append a contents to a file.
   *
   * @param path Path to file.
   * @param contents Append contents.
   */
  abstract append(path: string, contents: string): PromiseOr<FileMeta>

  /**
   * Prepend a contents to a file.
   *
   * @param path Path to file.
   * @param contents Prepend contents.
   */
  abstract prepend(path: string, contents: string): PromiseOr<FileMeta>

  /**
   * Move a file or directory.
   *
   * @param path Path to the file or directory.
   * @param newPath Move destination path.
   */
  abstract move(path: string, newPath: string): PromiseOr<NodeMeta>

  /**
   * Copy a file or directory.
   *
   * @param path Path to the file or directory.
   * @param newPath Copy destination path.
   */
  abstract copy(path: string, newPath: string): PromiseOr<NodeMeta>

  /**
   * Delete a file or directory.
   *
   * @param path Path to file or directory.
   */
  abstract delete(path: string): PromiseOr

  /**
   * Make directory.
   *
   * @param path Path to directory.
   */
  abstract makeDirectory(path: string): PromiseOr<DirectoryMeta>
}
