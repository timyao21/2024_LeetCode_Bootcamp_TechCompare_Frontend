import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user2, setUser] = useState({
        isLoggedIn: false,
        email: ''
    });

    useEffect(() => {
        console.log("Current email:", user2.email); // 这将在 user2.email 更新后打印新值
    }, [user2.email]); // 添加 user2.email 作为依赖，以便在它变化时运行 useEffect

    const login = (email) => {
        setUser({ isLoggedIn: true, email });
        console.log("loginnn");
        console.log(email);
        console.log("login_end");
    };

    const logout = () => {
        setUser({ isLoggedIn: false, email: '' });
        console.log("logouttttt");
    };

    return (
        <UserContext.Provider value={{ user2, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
