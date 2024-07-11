const useGenre = (filterGenre) => { //get id of genre
  console.log('useGenre', filterGenre.length < 1)
  console.log('useGenre', filterGenre.length)
  console.log('useGenre', filterGenre)
  if (filterGenre.length < 1) return "";

  const GenreIds = filterGenre.map((g) => g.id);
  console.log('useGenre GenreIds', GenreIds)
  console.log('useGenre GenreIds reduce', GenreIds.reduce((acc, curr) => acc + ", " + curr))
  return GenreIds.reduce((acc, curr) => acc + ", " + curr);
};

export default useGenre;
