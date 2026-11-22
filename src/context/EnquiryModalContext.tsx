import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface EnquiryModalContextValue {
  isOpen: boolean;
  defaultProgram: string;
  openEnquiryModal: (programLabel?: string) => void;
  closeEnquiryModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextValue>({
  isOpen: false,
  defaultProgram: '',
  openEnquiryModal: () => {},
  closeEnquiryModal: () => {},
});

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProgram, setDefaultProgram] = useState('');

  const openEnquiryModal = useCallback((programLabel = '') => {
    setDefaultProgram(programLabel);
    setIsOpen(true);
  }, []);

  const closeEnquiryModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnquiryModalContext.Provider
      value={{ isOpen, defaultProgram, openEnquiryModal, closeEnquiryModal }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  return useContext(EnquiryModalContext);
}
