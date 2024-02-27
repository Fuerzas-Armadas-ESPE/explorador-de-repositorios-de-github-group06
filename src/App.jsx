import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import RepoList from "./components/RepoList";
import "./App.css"; // Archivo de estilos personalizado

const App = () => {
  const [username, setUsername] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
  };

  return (
    <div>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h3" component="div" className="title">
            Mi Explorador de Repositorios
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ padding: "10%" }}>
            Buscar Repositorios
          </Button>
        </form>
        {showRepoList && <RepoList username={username} />}
      </Container>
    </div>
  );
};

export default App;
