import { reactive, ref, shallowRef } from "vue";
import type { NodeType, NodeId } from "./types";
import { cloneDeep } from "lodash-es";

export const useTree = (treeData?: NodeType) => {
  const data = shallowRef(cloneDeep(treeData) || getDefaultTreeData());
  const selectedId = ref<NodeId>();

  const select = (id?: NodeId) => {
    selectedId.value = id;
  };

  const updateTree = () => {
    data.value = cloneDeep(data.value);
  };

  const expand = (id: NodeType["id"]) => {
    travel([data.value], (node) => {
      if (node.id === id) {
        node.collapse = false;
        updateTree();
        return true;
      }
    });
  };

  const collapse = (id: NodeType["id"]) => {
    travel([data.value], (node) => {
      if (node.id === id) {
        node.collapse = true;
        updateTree();
        return true;
      }
    });
  };

  return reactive({
    data,
    expand,
    collapse,
    select,
    selectedId,
  });
};

function getDefaultTreeData(): NodeType {
  return {
    id: 1,
    name: "Foo",
    value: "foo",
    children: [
      {
        id: "1-1",
        name: "Foo1",
        value: "foo1",
        children: [
          {
            id: "1-1-1",
            name: "Foo1-1",
            value: "foo1-1",
          },
          {
            id: "1-1-2",
            name: "Foo1-2",
            value: "foo1-2",
            children: [
              {
                id: "1-1-2-1",
                name: "Foo1-2-1",
                value: "foo1-2-1",
              },
            ],
          },
          {
            id: "1-1-3",
            name: "Foo1-3",
            value: "foo1-3",
          },
        ],
      },
      {
        id: "1-2",
        name: "Foo2",
        value: "foo2",
      },
      {
        id: "1-3",
        name: "Foo3",
        value: "foo3",
      },
    ],
  };
}

function travel(
  nodeList: NodeType[],
  cb: (
    node: NodeType,
    index: number,
    parentNode: NodeType | undefined,
  ) => boolean | void,
  parentNode?: NodeType,
) {
  for (let i = 0; i < nodeList.length; i++) {
    const childNode = nodeList[i];
    const stopTravel = cb(childNode, i, parentNode);
    if (stopTravel) {
      break;
    }

    if (!childNode.children?.length) {
      continue;
    }

    travel(childNode.children, cb, childNode);
  }
}
