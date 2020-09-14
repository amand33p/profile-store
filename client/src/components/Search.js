import React from 'react';
import { Input } from 'semantic-ui-react';

const Search = ({ search, setSearch, isDarkMode }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-card">
      <Input
        className={isDarkMode ? 'dark-mode-input' : ''}
        fluid
        size="large"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for contact name or profile link"
        icon={{ name: 'search', color: 'teal' }}
        iconPosition="left"
        action={
          search !== '' && {
            color: 'teal',
            icon: 'close',
            onClick: () => setSearch(''),
          }
        }
      />
    </div>
  );
};

export default Search;
