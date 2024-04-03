import React from "react";
import "./style.css";
import { IFavoriteListItem } from "types/interface";
import defaultProfileImage from "assets/image/default-profile-image.png";

interface IProps {
  favoriteItem: IFavoriteListItem;
}

export default function FavoriteItem({ favoriteItem }: IProps) {
  const { email, nickname, profileImage } = favoriteItem;
  return (
    <div className="favorite-item">
      <div className="favorite-item-profile-box">
        <div
          className="favorite-item-profile-image"
          style={{
            backgroundImage: `url(${
              profileImage ? profileImage : defaultProfileImage
            })`,
          }}
        ></div>
      </div>
      <div className="favorite-item-nickname">{nickname}</div>
    </div>
  );
}
