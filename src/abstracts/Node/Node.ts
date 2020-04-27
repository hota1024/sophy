import { SophyInterface } from '../../interfaces/Sophy'
import { NodeType } from '../../types/NodeType'
import { File } from '../../impls/nodes/File'
import { Directory } from '../../impls/nodes/Directory'

/**
 * Node abstract class.
 */
export abstract class Node {
  /**
   * Sophy instance.
   */
  protected sophy: SophyInterface

  /**
   * Node type.
   */
  readonly type: NodeType = NodeType.Unknown

  /**
   * Path to node.
   */
  path: string

  /**
   * Name of node.
   */
  get name() {
    const splited = this.path.split('/')
    return splited[splited.length - 1]
  }

  /**
   * Parent path of node.
   */
  get parentPath() {
    const splited = this.path.split('/')
    return splited[splited.length - 2] ?? '/'
  }

  /**
   * Node constructor.
   *
   * @param sophy Sophy instance.
   * @param path Path to node.
   */
  constructor(sophy: SophyInterface, path: string) {
    this.sophy = sophy
    this.path = path
  }

  /**
   * Whether node is a file.
   */
  isFile(): this is File {
    return this.type === NodeType.File
  }

  /**
   * Whether node is a directory.
   */
  isDirectory(): this is Directory {
    return this.type === NodeType.Directory
  }

  /**
   * Set node path.
   *
   * @param path
   */
  setPath(path: string) {
    this.path = path
  }

  /**
   * Get node size.
   */
  async getSize() {
    const size = await this.sophy.getSize(this.path)

    return size
  }

  /**
   * Whether node is exists.
   */
  async isExists() {
    const exists = this.sophy.has(this.path)

    return exists
  }

  /**
   * Move node.
   *
   * @param newPath Move destination path.
   */
  async move(newPath: string) {
    await this.sophy.move(this.path, newPath)

    return this
  }

  /**
   * Copy node.
   *
   * @param newPath Copy destination path.
   */
  async copy(newPath: string) {
    await this.sophy.copy(this.path, newPath)

    return this
  }

  /**
   * Delete node.
   */
  async delete() {
    await this.sophy.delete(this.path)
  }
}
