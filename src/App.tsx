import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ContractForm } from './components/ContractForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContractForm />
    </ThemeProvider>
  );
}

export default App; 