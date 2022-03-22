import React from "react";
import Text from "components/Text";
import * as S from "./style";
import UserList from "components/UserList";

const Favorites = () => {
  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <UserList isFavList={true} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
