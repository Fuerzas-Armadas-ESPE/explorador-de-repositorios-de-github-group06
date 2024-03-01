import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const RepoCard = ({ repoName, repoSize }) => {
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
          <Typography variant="body2" align="center" className="repo-size">
            Tamaño: {repoSize}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RepoCard;
