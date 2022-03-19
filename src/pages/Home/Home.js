import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import { useState } from "react";

const Home = () => {
  const [countryList, setCountryList] = useState([])
  const { users, isLoading } = usePeopleFetch(countryList);

  const toggleCountry = (country) => {
    if (countryList.includes(country)) {
      const newCountryList = countryList.filter((existingCountry) => existingCountry != country)
      setCountryList(newCountryList)
    } else {
      const newCountryList = [...countryList, country];
      setCountryList(newCountryList)
    }
  }

  console.log(countryList)

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} onCountryChange={toggleCountry} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
