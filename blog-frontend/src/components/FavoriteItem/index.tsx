import React from "react";
import "./style.css";
import { IFavoriteItem } from "types/interface";
import defaultProfileImage from "assets/image/default-profile-image.png";

interface Props {
  favoriteItem: IFavoriteItem;
}

export default function FavoriteItem({ favoriteItem }: Props) {
  const { userEmail, userNickname, userProfileImage } = favoriteItem;
  return (
    <div className="favorite-item">
      <div className="favorite-item-profile-box">
        <div
          className="favorite-item-profile-image"
          style={{
            backgroundImage: `url(${
              userProfileImage ? userProfileImage : defaultProfileImage
            })`,
          }}
        ></div>
      </div>
      <div className="favorite-item-nickname">{userNickname}</div>
    </div>
  );
}
