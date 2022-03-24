import React, { useState, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [countryList, setCountryList] = useState([]);
  const [page, setPage] = useState(1);
  const [myUsers, setMyUsers] = useState([]);
  const getNextPage = () => setPage((page) => page + 1);
  const { users, isLoading } = usePeopleFetch(countryList, page);

  useEffect(() => {
    setMyUsers([...myUsers, ...users]);
  }, [users]);

  const toggleCountry = (country) => {
    setMyUsers([]);
    if (countryList.includes(country)) {
      const newCountryList = countryList.filter(
        (existingCountry) => existingCountry != country
      );
      setCountryList(newCountryList);
    } else {
      const newCountryList = [...countryList, country];
      setCountryList(newCountryList);
    }
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={myUsers}
          isLoading={isLoading}
          onCountryChange={toggleCountry}
          getNextPage={getNextPage}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
