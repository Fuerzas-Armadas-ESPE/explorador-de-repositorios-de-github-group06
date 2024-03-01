import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const RepoCard = ({ repoName, repoSize, stars, created, language }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="repo-card"
    >
      <CardContent>
        <Typography variant="h5" align="center">
          {repoName}
        </Typography>
        {isHovered && (
          <>
            <Typography variant="body2" align="center" className="repo-size">
              Tamaño: {repoSize}
            </Typography>
            <Typography variant="body2" align="center" className="repo-created">
              Fecha de Creación: {created}
            </Typography>
            <Typography variant="body2" align="center" className="repo-stars">
              Estrellas: {stars}
            </Typography>
            <Typography variant="body2" align="center" className="repo-language">
              Idioma: {language}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RepoCard;
