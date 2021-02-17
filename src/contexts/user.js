import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    //with Context API, user can be accessed in Home page
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user: [user, setUser]}}>
            {props.children}
        </UserContext.Provider>
    )
}