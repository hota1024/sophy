import { Node } from '../../../abstracts/Node'
import { NodeType } from '../../../types/NodeType'

/*
 * Directory node class.
 */
export class Directory extends Node {
  /**
   * Node type.
   */
  readonly type: NodeType = NodeType.Directory

  /**
   * List children of directory.
   */
  async children() {
    const children = await this.sophy.listChildren(this.path)

    return children
  }
}
