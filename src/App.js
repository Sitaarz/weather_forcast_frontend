import "./App.css";
import WeatherGrid from "./components/WeatherGrid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Box, Button } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [isDarkTheme, setTheme] = useState(false);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <WeatherGrid></WeatherGrid>
      <Box textAlign={'center'} margin={'10px'}>
        <Button
          onClick={() => {
            setTheme(!isDarkTheme);
          }}
          variant="outlined"
        >
          Change Theme
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
