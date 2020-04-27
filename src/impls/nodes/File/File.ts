import { Node } from '../../../abstracts/Node'
import { NodeType } from '../../../types/NodeType'

/*
 * File node class.
 */
export class File extends Node {
  /**
   * Node type.
   */
  readonly type: NodeType = NodeType.Directory

  /**
   * Read file.
   */
  async read() {
    const content = await this.sophy.read(this.path)

    return content
  }

  /**
   * Read file using a stream.
   */
  readStream() {
    return this.sophy.readStream(this.path)
  }

  /**
   * Get file mime-type.
   */
  async getMime() {
    const mime = await this.sophy.getMime(this.path)

    return mime
  }

  /**
   * Write file.
   *
   * @param contents Write contents.
   */
  async write(contents: string) {
    await this.sophy.write(this.path, contents)

    return this
  }

  /**
   * Write file using a stream.
   */
  writeStream() {
    return this.sophy.writeStream(this.path)
  }

  /**
   * Append a contents to file.
   *
   * @param contents Append contents.
   */
  async append(contents: string) {
    await this.sophy.append(this.path, contents)

    return this
  }

  /**
   * Prepend a contents to file.
   *
   * @param contents Prepend contents.
   */
  async prepend(contents: string) {
    await this.sophy.prepend(this.path, contents)

    return this
  }
}
