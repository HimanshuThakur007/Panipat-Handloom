export const filterData = (data, searchText, searchFields) => {
    if (!searchText) {
      return data;
    }
  
    return data.filter((item) =>
      searchFields.some((field) =>
        item[field].toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };