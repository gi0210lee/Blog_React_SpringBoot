import axios from "axios";
import { ISignInRequestDto, ISignUpRequestDto } from "./request/auth";
import { ISignInResponseDto, ISignUpResponseDto } from "./response/auth";
import { IResponseDto } from "./response";
import {
  IGetSignInUserResponseDto,
  IGetUserResponseDto,
  IPatchNicknameResponseDto,
  IPatchProfileImageResponseDto,
} from "./response/user";
import {
  IPatchNicknameRequestDto,
  IPatchProfileImageRequestDto,
} from "./request/user";
import {
  IPostBoardRequestDto,
  IPostCommentRequestDto,
  IPatchBoardRequestDto,
} from "./request/board";
import {
  IDeleteBoardResponseDto,
  IGetBoardResponseDto,
  IGetCommentListResponseDto,
  IGetFavoriteListResponseDto,
  IGetSearchBoardListResponseDto,
  IGetTop3BoardListResponseDto,
  IGetUserBoardListResponseDto,
  IIncreaseViewCountResponseDto,
  IPatchBoardResponseDto,
  IPostBoardResponseDto,
  IPostCommentResponseDto,
  IPutfavoriteResponseDto,
} from "./response/board";
import IGetLatestBoardListResponseDto from "./response/board/get-latest-board-list.response.dto";
import {
  IGetPopularListResponseDto,
  IGetRelationListResponseDto,
} from "./response/search";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: ISignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: ISignInResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;

      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const signUpRequest = async (requestBody: ISignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then((response) => {
      const responseBody: ISignUpResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

const GET_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_URL = () => `${API_DOMAIN}/board/latest-list`;
const GET_TOP3_BOARD_URL = () => `${API_DOMAIN}/board/top3-list`;
const GET_SEARCH_BOARD_LIST_URL = (
  searchWord: string,
  preSearchWord: string | null
) =>
  `${API_DOMAIN}/board/search-list/${searchWord}${
    preSearchWord ? "/" + preSearchWord : ""
  }`;
const GET_USER_BOARD_LIST_URL = (email: string) =>
  `${API_DOMAIN}/board/user-board-list/${email}`;
const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) =>
  `${API_DOMAIN}/search/${searchWord}/relation-list`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/comment`;
const PATCH_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const PUT_FAVORITE_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;

export const getBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: IGetBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getLatestBoardListRequest = async () => {
  const result = await axios
    .get(GET_LATEST_BOARD_URL())
    .then((response) => {
      const responseBody: IGetLatestBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getTop3BoardListRequest = async () => {
  const result = await axios
    .get(GET_TOP3_BOARD_URL())
    .then((response) => {
      const responseBody: IGetTop3BoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getSearchBoardListRequest = async (
  searchWord: string,
  preSearchWord: string | null
) => {
  const result = await axios
    .get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
    .then((response) => {
      const responseBody: IGetSearchBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getUserBoardListRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_BOARD_LIST_URL(email))
    .then((response) => {
      const responseBody: IGetUserBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getPopularListRequest = async () => {
  const result = await axios
    .get(GET_POPULAR_LIST_URL())
    .then((response) => {
      const responseBody: IGetPopularListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getRelationListRequest = async (searchWord: string) => {
  const result = await axios
    .get(GET_RELATION_LIST_URL(searchWord))
    .then((response) => {
      const responseBody: IGetRelationListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const increaseViewCountRequest = async (
  boardNumber: number | string
) => {
  const result = await axios
    .get(INCREASE_VIEW_COUNT_URL(boardNumber))
    .then((response) => {
      const responseBody: IIncreaseViewCountResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getFavoriteListRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_FAVORITE_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: IGetFavoriteListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
export const getCommentListRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_COMMENT_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: IGetCommentListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postBoardRequest = async (
  requestBody: IPostBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: IPostBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const postCommentRequest = async (
  boardNumber: number | string,
  requestBody: IPostCommentRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(
      POST_COMMENT_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: IPostCommentResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const patchBoardRequest = async (
  boardNumber: number | string,
  requestBody: IPatchBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(
      PATCH_BOARD_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: IPatchBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const putFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
    .then((response) => {
      const responseBody: IPutfavoriteResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const deleteBoardRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
    .then((response) => {
      const responseBody: IDeleteBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const signInApi = async (data: any) => {
  const response = await axios
    .post("http://localhost:4000/api/auth/signIn", data)
    .catch((error) => {
      return;
    });

  if (!response) return null;

  const result = response.data;
  return result;
};

export const signUpApi = async (data: any) => {
  const response = await axios
    .post("http://localhost:4000/api/auth/signUp", data)
    .catch((error) => {
      return;
    });
  if (!response) return;

  const result = response.data;
  return result;
};

const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;

export const getUserRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_URL(email))
    .then((response) => {
      const responseBody: IGetUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
    .then((response) => {
      const responseBody: IGetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const patchNicknameRequest = async (
  requestBody: IPatchNicknameRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(PATCH_NICKNAME_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: IPatchNicknameResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const patchProfileImageRequest = async (
  requestBody: IPatchProfileImageRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(PATCH_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: IPatchProfileImageResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: IResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = () => {
  return { headers: { "Content-Type": "multipart/form-data" } };
};

export const fileUploadRequest = async (data: FormData) => {
  const result = await axios
    .post(FILE_UPLOAD_URL(), data, {
      ...multipartFormData(),
    })
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((error) => {
      return null;
    });

  return result;
};
