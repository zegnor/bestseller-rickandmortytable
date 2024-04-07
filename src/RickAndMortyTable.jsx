import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Grid, 
  IconButton,
  TablePagination,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

const CharacterRow = ({ character, expanded, onClick }) => (
  <>
    <TableRow>
      <TableCell>{character.name}</TableCell>
      <TableCell>{character.gender}</TableCell>
      <TableCell>{character.status}</TableCell>
      <TableCell>{character.species}</TableCell>
      <TableCell>{character.location.name}</TableCell>
      <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => onClick(character)}>
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="expandable-content" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className="character-details">
            <img src={character.image} alt={character.name} className="character-image" />
            <List className="character-info">
              <ListItem>
                <ListItemText primary={`Name: ${character.name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Gender: ${character.gender}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Status: ${character.status}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Species: ${character.species}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Origin: ${character.origin.name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Last Location: ${character.location.name}`} />
              </ListItem>
            </List>
            <TableContainer component={Paper} className="episode-table">
              <Table className="episodeList">
                <TableHead>
                  <TableRow>
                    <TableCell>Episode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {character.episode.map((episode, index) => (
                    <TableRow key={index}>
                      <TableCell>{episode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);

const RickAndMortyTable = () => {
  const [characters, setCharacters] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [expandedCharacter, setExpandedCharacter] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchData();
  }, [searchName]);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleToggleDetails = (character) => {
    setExpandedCharacter(expandedCharacter === character ? null : character);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Search by name..."
          variant="outlined"
          fullWidth
          value={searchName}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="rick-and-morty-characters">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Last Location</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? characters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : characters
              ).map((character) => (
                <CharacterRow
                  key={character.id}
                  character={character}
                  expanded={expandedCharacter === character}
                  onClick={handleToggleDetails}
                />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={characters.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default RickAndMortyTable;
