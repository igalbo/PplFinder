import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, onCountryChange, isFavList }) => {
  const [favorites, setFavorites] = useState([]);
  isFavList && (users = favorites);

  useEffect(() => {
    // Wrapping in try-catch for a case where localstorage's "favorites" is invalid
    try {
      const localFavorites = JSON.parse(localStorage.getItem("favorites"));
      localFavorites && setFavorites(localFavorites);
    } catch (e) {
      console.log("Local storage JSON error", e);
    }
  }, []);

  const toggleFavorite = (index) => {
    const newFavorites =
      isFavList || isInFavorites(index)
        ? favorites.filter((user) => user != users[index])
        : [...favorites, users[index]];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const isInFavorites = (index) => favorites.includes(users[index]);

  return (
    <S.UserList>
      {!isFavList && (
        <S.Filters>
          <CheckBox onChange={onCountryChange} value="BR" label="Brazil" />
          <CheckBox onChange={onCountryChange} value="AU" label="Australia" />
          <CheckBox onChange={onCountryChange} value="CA" label="Canada" />
          <CheckBox onChange={onCountryChange} value="DE" label="Germany" />
          <CheckBox onChange={onCountryChange} value="US" label="United States" />
        </S.Filters>
      )}
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User key={index} onClick={() => toggleFavorite(index)}>
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
              <S.IconButtonWrapper isVisible={isInFavorites(index)}>
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
