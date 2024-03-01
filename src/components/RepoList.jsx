import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import RepoCard from "./RepoCard";
import { Pagination, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("size"); // Predeterminado: ordenar por tamaño
  const reposPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const reposWithDate = response.data.map((repo) => ({
          ...repo,
          created_at: new Date(repo.created_at),
        }));
        setRepos(reposWithDate);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const compareFunction = (a, b) => {
    if (filter === "size") {
      return b.size - a.size;
    } else if (filter === "stars") {
      return b.stargazers_count - a.stargazers_count;
    } else if (filter === "created") {
      return b.created_at - a.created_at;
    } else if (filter === "language") {
      return a.language.localeCompare(b.language);
    }
    return 0;
  };

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };

  const paginatedRepos = repos.slice((page - 1) * reposPerPage, page * reposPerPage);

  return (
    <div>
      <h2>Repositorios de {username}</h2>
      {/* Selector de filtro */}
      <FormControl fullWidth>
        <InputLabel id="filter-label">Filtrar por:</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          label="Filtrar por:"
        >
          <MenuItem value="size">Tamaño</MenuItem>
          <MenuItem value="stars">Estrellas</MenuItem>
          <MenuItem value="created">Fecha de Creación</MenuItem>
          <MenuItem value="language">Idioma</MenuItem>
        </Select>
      </FormControl>
      <ul>
        {paginatedRepos.sort(compareFunction).map((repo) => (
          <RepoCard
            key={repo.id}
            repoName={repo.name}
            repoSize={repo.size}
            stars={repo.stargazers_count}
            created={formatDate(repo.created_at)}
            language={repo.language}
          />
        ))}
      </ul>
      <div className="pag-container">
        <Pagination
          count={Math.ceil(repos.length / reposPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </div>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
