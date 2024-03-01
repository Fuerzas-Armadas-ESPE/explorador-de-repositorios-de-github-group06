import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import RepoCard from "./RepoCard"; // Importa el componente RepoCard
import {Pagination} from "@mui/material";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const reposPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        setRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedRepos = repos.slice((page - 1) * reposPerPage, page * reposPerPage);

  return (
    <div>
      <h2>Repositorios de {username}</h2>
      <ul>
        {paginatedRepos.map((repo) => (
          <RepoCard key={repo.id} repoName={repo.name} repoSize={repo.size} />
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
