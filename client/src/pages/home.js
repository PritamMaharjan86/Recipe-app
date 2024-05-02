import React, { useState, useEffect } from "react";
import "./home.css";
import Loader from "../components/loader";
import { ToastContainer, toast } from 'react-toastify';
import http from "../pages/http";
import { resolvePath, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const username = localStorage.getItem('username');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

  };

  const detectKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();
  };


  useEffect(() => {
    toast.success("Successfully Logged In");
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await http.post('/recipe/get-all-recipes',
        {
          searchTerm
        });

      console.log(response.data[0]);
      setRecipes(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log("recipes", recipes);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const pages = [];
  const settings = ['Profile', 'Logout'];


  return (<>
    <ToastContainer />
    <AppBar position="static">
      <Container maxWidth="xl" style={{ backgroundColor: "#fa8e1a", display: "flex", justifyContent: "space-between" }} >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',

            }}
          >
            Recipe App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',

            }}
          >
            Recipe App
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username.toUpperCase().slice(0)} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {console.log('setting', setting)}
                  {
                    setting === 'Logout' ?
                      <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>

                      :
                      setting === 'Profile' ?
                        <Typography textAlign="center" onClick={() => navigate('/profile')} >{setting}</Typography>

                        :
                        <Typography textAlign="center">{setting}</Typography>

                  }
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <div className="App">

      <div className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search for recipe"
          // to get event from handleChange
          onChange={(e) => handleChange(e)}
          onKeyUp={(e) => detectKey(e)}

        ></input>
        {loading && (
          <div className="blur-background">
            <Loader />

          </div>
        )}




      </div>


      <div className="recipes">
        <h1>Recipes</h1>

        {recipes.map((data, index) => {
          return (
            <>

              <div className="board" key={index}>

                <span>
                  <h2>{data.recipe_name.toUpperCase()} </h2>
                </span>
                <br />
                <h2>Ingredients</h2>
                <div>
                  {data.ingredients.slice(1).split(",").map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </div>
                <br />
                <h2>Instructions </h2>
                {data.steps.slice(1).split(",").map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                <br />
                <br />
                <h2>Description</h2>
                <div>
                  {data.description}
                </div>
              </div>

            </>
          );
        })}
      </div>
    </div>

  </>
  );
}

export default Home;
