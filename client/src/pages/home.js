import React, { useState, useEffect } from "react";
import "./home.css";
import Loader from "../components/loader";
import { ToastContainer, toast } from 'react-toastify';
import http from "../pages/http";
import { resolvePath, useNavigate } from 'react-router-dom';
import Comment from "../components/comment";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import { Button, Icon, Label } from 'semantic-ui-react'

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

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

  const handleLike = async (recipe_id) => {
    try {
      const response = await http.post('/recipe/like-recipe',
        {
          userId,
          recipe_id,
        });
      console.log('response', response);


    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    toast.success("Successfully Logged In");
  }, []);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    setLoading(true);
    try {
      const response = await http.post('/recipe/get-all-recipes',
        {
          searchTerm,
          userId
        });


      setRecipes(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


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
          const comments = data.comment && data.comment.split(' ,');
          return (
            <>
              <Card
                data-resizable
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  width: 800,
                  overflow: 'auto',
                  resize: 'horizontal',
                  '--icon-size': '100px',
                }}
              >
                <CardOverflow variant="solid" style={{ backgroundColor: 'orange' }}>
                  <AspectRatio
                    variant="outlined"
                    color="warning"
                    ratio="1"
                    sx={{
                      m: 'auto',
                      transform: 'translateY(50%)',
                      borderRadius: '50%',
                      width: 'var(--icon-size)',
                      boxShadow: 'sm',
                      bgcolor: 'background.surface',
                      position: 'relative',

                    }}
                  >
                    <div>
                      <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem', color: 'orange' }} />
                    </div>
                  </AspectRatio>
                </CardOverflow>
                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
                  {data.recipe_name.toUpperCase()}
                </Typography>
                <CardContent sx={{ maxWidth: '80ch' }}>
                  {data.description.charAt(0).toUpperCase() + data.description.slice(1)}
                </CardContent>

                <h3>Ingredients</h3>
                <CardContent sx={{ maxWidth: '80ch' }}>
                  {data.ingredients.slice(1, -1).split(",").map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </CardContent>
                <h3>Steps</h3>
                <CardContent sx={{ maxWidth: '80ch' }}>
                  {data.steps.slice(1, -1).split(",").map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </CardContent>

                <CardActions
                  orientation="vertical"
                  buttonFlex={1}
                  sx={{

                    '--Button-radius': '40px',
                    width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',

                  }}
                >

                  <Button variant="solid" style={{ backgroundColor: 'orange' }} onClick={() => handleLike(data.id)}>
                    LIKE
                  </Button>

                  <h3>Comments</h3>
                  <CardContent className="comment-section">
                    {
                      comments && comments.map((comment) => {
                        return (
                          <text style={{ textAlign: "left" }}><h3>{username}:</h3> {comment}<br /></text>
                        )
                      })
                    }
                  </CardContent>

                  <Comment recipe_id={data.id} />
                </CardActions>
              </Card><br />


            </>
          );
        })}
      </div>
    </div>

  </>
  );
}


export default Home;
