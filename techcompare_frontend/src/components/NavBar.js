import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';



function BasicExample() {
  // Initialize state directly from localStorage if available
  const { user2, login, logout } = useContext(UserContext); // 使用 useContext 钩子访问 Context
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    isLoggedIn: !!localStorage.getItem('email'),
    email: localStorage.getItem('email') || '',
  });
  const [refresh, setRefresh] = useState(0); // 新增状态用于强制刷新
  console.log("abcsds");
  console.log(user2.email);


  useEffect(() => {
    const handleStorageChange = () => {
      const storedEmail = localStorage.getItem('email');
      setUser({
        isLoggedIn: !!storedEmail,
        email: storedEmail || ''
      });
      setRefresh(refresh => refresh + 1); // 更新状态以强制重新渲染
    };

    window.addEventListener('storage', handleStorageChange); // 监听storage事件
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setUser({
      isLoggedIn: !!localStorage.getItem('email'),
      email: localStorage.getItem('email') || '',
    });
  }, [refresh]); // 依赖于refresh状态的改变\

  const handleWishList = () => {
    if (user2.email==""){
      alert("Sign in First!");
      console.log("Email is null, exiting function.");
      return;  // 当邮箱为空时，直接返回不再执行之后的代码
    }
    // navigate("/wishlistpage");
  };

  const handleLogin = () => {
    const email = '';  // 这里应该从登录表单获取
    localStorage.setItem('email', email);  // 存储 email 到 localStorage
    setUser({ isLoggedIn: true, email });  // 更新状态
    console.log("Attempting to log in with email:", email);
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, email: '' });  // Reset state
    logout();
    console.log("Logged out");
  };


  return (
    <Navbar expand="lg" className="bg-color2">
      <Container>
        <Navbar.Brand href="/">Tech Compare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link> */}
                <Link className="nav-link me-auto" to="/">Home</Link>
                <Link className="nav-link me-auto" to="/search">Search</Link>

            </Nav>
            <Nav className="ms-auto">

            {user2.isLoggedIn ? (
                <Nav.Link href="/wishlistpage">Wish List</Nav.Link>
            ) : (
                <Nav.Link onClick={handleWishList}>Wish List</Nav.Link>
            )}
            {/* <Nav.Link href="/wishlistpage">Wish List</Nav.Link>/ */}
            {/* <Nav.Link onClick={handleWishList}>Wish List</Nav.Link> */}

            {/* <Nav.Link href="/wishlistpage">Wish List</Nav.Link> */}


            {user2.isLoggedIn ? (
              <NavDropdown title={user2.email} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              // <Nav.Link href="/signin" onClick={handleLogin}>Sign in/Sign up</Nav.Link>
              <Link className="nav-link me-auto" to="/signin">Sign in/Sign up</Link>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;


