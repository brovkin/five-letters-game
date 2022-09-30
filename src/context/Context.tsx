import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface CreateListProvider {
  children: JSX.Element | React.ReactNode;
}

interface CreateListContext {
  listModal: boolean;
  setListModal: Dispatch<SetStateAction<boolean>>;
}

const CreateListContext = createContext<CreateListContext | null>(null);

const CreateListProvider: FC<CreateListProvider> = ({ children }) => {
  const [listModal, setListModal] = useState<boolean>(false);
  return (
    <CreateListContext.Provider value={{ listModal, setListModal }}>
      {children}
    </CreateListContext.Provider>
  );
};

export { CreateListContext, CreateListProvider };
