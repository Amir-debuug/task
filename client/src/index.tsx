import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mui/theme";
import { AuthContextProvider } from "./contextApi/useAuthContext";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeProvider>
);
