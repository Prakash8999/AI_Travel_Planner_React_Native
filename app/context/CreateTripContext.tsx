import React, { createContext, Dispatch, ReactNode, useState } from 'react';

// Define the context type
interface TripContextType {
  tripData: any;
  setTripData:any;
  otherState: any; // Add other states as needed
  setOtherState: any;
}

// Initialize with default values
const defaultValue: TripContextType = {
  tripData: null,
  setTripData: () => {},
  otherState: null,
  setOtherState: () => {},
};

interface CreateTripProviderProps {
	children: ReactNode;
  }
  
// Create the context

export const CreateTripContext = createContext(defaultValue);

// Create a provider component
export const CreateTripProvider: React.FC<CreateTripProviderProps> = ({ children }) => {
  const [tripData, setTripData] = useState<any>([]);
  const [otherState, setOtherState] = useState<any>(null); // Add more states as needed

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData, otherState, setOtherState }}>
      {children}
    </CreateTripContext.Provider>
  );
};
