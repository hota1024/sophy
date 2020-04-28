import { NodeMeta } from './NodeMeta'
import { NodeType } from '../../types'

export type FileMeta = NodeMeta & { type: NodeType.File }
