import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, onCountryChange }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    Array.isArray(localFavorites) && setFavorites(JSON.parse(localFavorites)); // Checking if localstorage's "favorites" is an array, to avoid any existing unexpected tokens
  }, []);

  console.dir(users);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const toggleFavorite = (index) => {
    if (!isInFavorites(index)) {
      const newFavorites = [...favorites, users[index]];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const newFavorites = favorites.filter((user) => user != users[index]);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    // I know it looks ugly, will try to refactor later
  };

  const isInFavorites = (index) => favorites.includes(users[index]);

  console.log(favorites);

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={onCountryChange} value="BR" label="Brazil" />
        <CheckBox onChange={onCountryChange} value="AU" label="Australia" />
        <CheckBox onChange={onCountryChange} value="CA" label="Canada" />
        <CheckBox onChange={onCountryChange} value="DE" label="Germany" />
        <CheckBox onChange={onCountryChange} value="US" label="United States" />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => toggleFavorite(index)}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={index === hoveredUserId || isInFavorites(index)}
              >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
