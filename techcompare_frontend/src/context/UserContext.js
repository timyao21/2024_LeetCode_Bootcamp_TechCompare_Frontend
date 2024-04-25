// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//     const [user2, setUser] = useState({
//         isLoggedIn: false,
//         email: ''
//     });

//     useEffect(() => {
//         console.log("Current email:", user2.email); // 这将在 user2.email 更新后打印新值
//     }, [user2.email]); // 添加 user2.email 作为依赖，以便在它变化时运行 useEffect

//     const login = (email) => {
//         setUser({ isLoggedIn: true, email });
//         console.log("loginnn");
//         console.log(email);
//         console.log("login_end");
//     };

//     const logout = () => {
//         setUser({ isLoggedIn: false, email: '' });
//         console.log("logouttttt");
//     };

//     return (
//         <UserContext.Provider value={{ user2, login, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };




import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user2, setUser] = useState(() => {
        // 尝试从 localStorage 中获取状态
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { isLoggedIn: false, email: '' };
    });

    useEffect(() => {
        // 将用户状态保存到 localStorage
        localStorage.setItem('user', JSON.stringify(user2));
        console.log("Current email:", user2.email); // 这将在 user2.email 更新后打印新值
    }, [user2]); // 添加 user2 作为依赖，以便在它变化时运行 useEffect

    const login = (email) => {
        setUser({ isLoggedIn: true, email });
        console.log("loginnn");
        console.log(email);
        console.log("login_end");
    };

    const logout = () => {
        setUser({ isLoggedIn: false, email: '' });
        localStorage.setItem("authToken", "nosignin");

        console.log("logouttttt");
    };

    return (
        <UserContext.Provider value={{ user2, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
