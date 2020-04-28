import { NodeMeta } from './NodeMeta'
import { NodeType } from '../../types'

export type DirectoryMeta = NodeMeta & { type: NodeType.Directory }
