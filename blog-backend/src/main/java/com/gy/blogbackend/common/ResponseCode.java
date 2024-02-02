package com.gy.blogbackend.common;

public interface ResponseCode {

    // HTTP STATUS
    //    200
    public static final String SUCCESS = "SU";

    //    400
    public static final String VALIDATION_FAILED = "VF";
    public static final String DUPLICATE_EMAIL = "DE";
    public static final String DUPLICATE_TEL_NUMBER = "DT";
    public static final String DUPLICATE_NICKNAME = "DN";
    public static final String NOT_EXISTED_USER = "NU";
    public static final String NOT_EXISTED_BOARD = "NB";

    // 401
    public static final String LOGIN_FAILED = "LF";
    public static final String AUTHORIZATION_FAILED = "AF";

    // 403
    public static final String NO_PERMISSION = "NP";

    // 500
    public static final String DATABASE_ERROR = "DBE";
}
