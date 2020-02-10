// use for translate component.pageName to title for display
export class DICTIONARY_FROM_PAGENAME_TO_TITLE {
  public static readonly LIST   = 'デバイス一覧';
  public static readonly DETAIL = '動画再生';
};

export const AJAX_RETRY_LIMIT = 5;

// update device image interval(msec)
export const LIST_UPDATE_INTERVAL = 10000;

export class API_PATH {
  public static readonly DEVICES       = '/v1/devices';
  public static readonly IMAGE         = '/v1/image/';
  public static readonly STREAM_PREFIX = '/v1/stream/';
  public static readonly STREAM_SUFFIX = '/stream_.m3u8';
};

export class PAGE_NAME {
  public static readonly LIST   = 'LIST';
  public static readonly DETAIL = 'DETAIL';
}

export class LIST_DISPLAY_CONFIG {
  public static readonly COL_INITIAL  = 3;
  public static readonly COL_MIN      = 2;
  public static readonly COL_MAX      = 8;
  public static readonly ROW_INITIAL  = 0;
  public static readonly ROW_MIN      = 1;
  public static readonly ROW_MAX      = 30;
  public static readonly ROW_NO_LIMIT = 0;
}

export class LOCAL_STORAGE_KEY {
  public static readonly BASE                    = 'SAFIE_DEVICE_LIST';
  public static readonly LIST_DISPLAY_CONFIG     = 'LIST_DISPLAY_CONFIG';
  public static readonly LIST_DISPLAY_CONFIG_COL = `${LIST_DISPLAY_CONFIG}.COL`;
  public static readonly LIST_DISPLAY_CONFIG_ROW = `${LIST_DISPLAY_CONFIG}.ROW`;
}
