package com.gy.blogbackend.common;

public interface ResponseMessage {
    // HTTP STATUS
    //    200
    public static final String SUCCESS = "Success";

    //    400
    public static final String VALIDATION_FAILED = "Validation failed.";
    public static final String DUPLICATE_EMAIL = "Duplication email.";
    public static final String DUPLICATE_TEL_NUMBER = "Duplication tel number.";
    public static final String DUPLICATE_NICKNAME = "Duplication nickname.";
    public static final String NOT_EXISTED_USER = "This user does not exist.";
    public static final String NOT_EXISTED_BOARD = "This board does not exist.";

    // 401
    public static final String LOGIN_FAILED = "Login Information mismatch.";
    public static final String AUTHORIZATION_FAILED = "Authorization Failed.";

    // 403
    public static final String NO_PERMISSION = "Do not have permission.";

    // 500
    public static final String DATABASE_ERROR = "Database error.";
}
