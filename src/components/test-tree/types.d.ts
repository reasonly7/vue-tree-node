export type NodeId = string | number;

export interface NodeType<ValueType = string> {
  id: NodeId;
  name: string;
  value: ValueType;
  collapse?: boolean; // 是否收起
  children?: NodeType<ValueType>[];
}
