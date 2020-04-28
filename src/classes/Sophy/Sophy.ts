import { SophyInterface } from '../..'
import { AdapterInterface, NodeMeta, FileMeta } from '../../interfaces'
import { NodeType } from '../../types'
import { Directory, File } from '../../impls'
import { Node } from '../../abstracts'
import { DirectoryMeta } from '../../interfaces/Adapter/DirectoryMeta'

/*
 * Sophy class.
 */
export class Sophy implements SophyInterface {
  /**
   * Adapter instance.
   */
  readonly adapter: AdapterInterface

  /**
   * Sophy constructor.
   *
   * @param adapter Adapter instance.
   */
  constructor(adapter: AdapterInterface) {
    this.adapter = adapter
  }

  /**
   * Check whether a file or directory exists.
   *
   * @param path Path to file or directory.
   */
  has(path: string) {
    return this.adapter.has(path)
  }

  /**
   * Ready a file.
   *
   * @param path Path to file.
   */
  read(path: string) {
    return this.adapter.read(path)
  }

  /**
   * Read a file using a stream.
   *
   * @param path Path to file.
   */
  readStream(path: string) {
    return this.adapter.readStream(path)
  }

  /**
   * List children of the directory.
   *
   * @param path Path to directory.
   */
  async listChildren(path: string) {
    const metaList = await this.adapter.listChildren(path)

    return metaList.map((meta) => this.nodeFromMeta(meta))
  }

  /**
   * Get size of the file or directory.
   *
   * @param path Path to file or directory.
   */
  getSize(path: string) {
    return this.adapter.getSize(path)
  }

  /**
   * Get MIME type of the file.
   *
   * @param path Path to file.
   */
  getMime(path: string) {
    return this.adapter.getMime(path)
  }

  /**
   * Write a new file.
   *
   * @param path Path to file.
   * @param contents Write contents.
   */
  async write(path: string, contents: string) {
    const meta = await this.adapter.write(path, contents)

    return this.nodeFromMeta(meta)
  }

  /**
   * Write a new file using a stream.
   *
   * @param path Path to file.
   */
  writeStream(path: string) {
    return this.adapter.writeStream(path)
  }

  /**
   * Update a file.
   *
   * @param path Path to file.
   * @param contents Contents.
   */
  async update(path: string, contents: string) {
    const meta = await this.adapter.update(path, contents)

    return this.nodeFromMeta(meta)
  }

  /**
   * Update a file using a stream.
   *
   * @param path Path to file.
   */
  updateStream(path: string) {
    return this.adapter.updateStream(path)
  }

  /**
   * Create or Update a file.
   *
   * @param path Path to file.
   * @param contents Put contents.
   */
  async put(path: string, contents: string) {
    const meta = await this.adapter.put(path, contents)

    return this.nodeFromMeta(meta)
  }

  /**
   * Create or Update a file using a stream.
   *
   * @param path Path to file.
   */
  putStream(path: string) {
    return this.adapter.putStream(path)
  }

  /**
   * Append a contents to a file.
   *
   * @param path Path to file.
   * @param contents Append contents.
   */
  async append(path: string, contents: string) {
    const meta = await this.adapter.append(path, contents)

    return this.nodeFromMeta(meta)
  }

  /**
   * Prepend a contents to a file.
   *
   * @param path Path to file.
   * @param contents Prepend contents.
   */
  async prepend(path: string, contents: string) {
    const meta = await this.adapter.prepend(path, contents)

    return this.nodeFromMeta(meta)
  }
  /**
   * Move a file or directory.
   *
   * @param path Path to the file or directory.
   * @param newPath Move destination path.
   */
  async move(path: string, newPath: string) {
    const meta = await this.adapter.move(path, newPath)

    return this.nodeFromMeta(meta)
  }

  /**
   * Copy a file.
   *
   * @param path Path to file.
   * @param newPath Copy destination path.
   */
  async copy(path: string, newPath: string) {
    const meta = await this.adapter.copy(path, newPath)

    return this.nodeFromMeta(meta)
  }

  /**
   * Delete a file or directory.
   *
   * @param path Path to file or directory.
   */
  async delete(path: string) {
    await this.adapter.delete(path)
  }

  /**
   * Make directory.
   *
   * @param path Path to directory.
   */
  async makeDirectory(path: string) {
    const meta = await this.adapter.makeDirectory(path)

    return this.nodeFromMeta(meta)
  }

  /**
   * Make `File` from a `FileMeta` object.
   *
   * @param meta FileMeta object.
   */
  private nodeFromMeta(meta: FileMeta): File

  /**
   * Make `Directory` from a `DirectoryMeta` object.
   *
   * @param meta FileMeta object.
   */
  private nodeFromMeta(meta: DirectoryMeta): Directory

  /**
   * Make `Directory` from a `DirectoryMeta` object.
   *
   * @param meta FileMeta object.
   */
  private nodeFromMeta(meta: NodeMeta): Node

  /**
   * Make `Node` from a `NodeMeta` object.
   *
   * @param meta Node meta object.
   */
  private nodeFromMeta(meta: NodeMeta): Node {
    if (meta.type === NodeType.Directory) {
      return new Directory(this, meta.path)
    }

    if (meta.type === NodeType.File) {
      return new File(this, meta.path)
    }

    throw new Error('Unknown file type.')
  }
}
