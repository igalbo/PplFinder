import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    localStorage.getItem("favorites") &&
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, []);

  const toggleFavorite = (index) => {
    const newFavorites = favorites.filter((user) => user != favorites[index]);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <S.UserList>
          <S.List>
            {favorites.map((user, index) => {
              return (
                <S.User
                  key={index}
                  // onMouseEnter={() => handleMouseEnter(index)}
                  // onMouseLeave={handleMouseLeave}
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
                  <S.IconButtonWrapper isVisible>
                    <IconButton>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </S.IconButtonWrapper>
                </S.User>
              );
            })}
            {/* {isLoading && (
              <S.SpinnerWrapper>
                <Spinner
                  color="primary"
                  size="45px"
                  thickness={6}
                  variant="indeterminate"
                />
              </S.SpinnerWrapper>
            )} */}
          </S.List>
        </S.UserList>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
