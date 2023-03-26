export interface ItemType {
  id: string;
  title: string;
  tabs: {
    id: string;
    itemName: string;
    itemText?: string;
  }[];
}

export interface CtxType {
  items: ItemType[];
  isModalOpen: boolean;
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  isModalOpenHandler: (text: boolean) => void;
  editableItemId: string;
  onSetEditableId: (id: string) => void;
  knowledgeTitle: string;
  setKnowledgeTitle: React.Dispatch<React.SetStateAction<string>>;
  addTabs: (id: string, text1: string, text2: string) => void;
}

export interface TabType {
  id: string;
  itemName: string;
  itemtext?: string;
}

export type BoxProps = { children: React.ReactNode };
