import { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  const [value, setValue] = useState();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MERN AUTH</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              <Tab to="/login" LinkComponent={Link} label="Login" />
              <Tab to="/signup" LinkComponent={Link} label="SignUp" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
