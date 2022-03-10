import { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = props => {
    const [tab, setTab] = useState('Events');

    return (
        <GlobalContext.Provider value={{ tab, setTab }}>
            { props.children }
        </GlobalContext.Provider>
    );
}
