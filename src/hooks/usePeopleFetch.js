import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (countriesArr, page = 1) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const countries = countriesArr
    ? "&nat=".concat(countriesArr.join().toLowerCase())
    : null;

  useEffect(() => {
    fetchUsers();
  }, [countries, page]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=${page}${countries}`
    );
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
