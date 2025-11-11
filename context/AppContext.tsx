
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Invoice, Client, Settings } from '../types';
import { invoices as initialInvoices, clients as initialClients, settings as initialSettings } from '../constants';

interface AppState {
  invoices: Invoice[];
  clients: Client[];
  settings: Settings;
}

type Action =
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'UPDATE_INVOICE'; payload: Invoice }
  | { type: 'DELETE_INVOICE'; payload: string }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'UPDATE_SETTINGS'; payload: Settings };

const initialState: AppState = {
  invoices: initialInvoices,
  clients: initialClients,
  settings: initialSettings,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_INVOICE':
      return { ...state, invoices: [...state.invoices, action.payload] };
    case 'UPDATE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.map(inv =>
          inv.id === action.payload.id ? action.payload : inv
        ),
      };
    case 'DELETE_INVOICE':
        return {
            ...state,
            invoices: state.invoices.filter(inv => inv.id !== action.payload)
        };
    case 'ADD_CLIENT':
        return { ...state, clients: [...state.clients, action.payload]};
    case 'UPDATE_CLIENT':
        return {
            ...state,
            clients: state.clients.map(client => client.id === action.payload.id ? action.payload : client),
        };
    case 'UPDATE_SETTINGS':
        return { ...state, settings: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
