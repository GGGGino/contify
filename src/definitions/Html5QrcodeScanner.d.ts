declare module "html5-qrcode"

/** Camera Device interface. */
interface CameraDevice {
  id: string;
  label: string;
}

/**
 * Code formats supported by this library.
 */
enum Html5QrcodeSupportedFormats {
  QR_CODE = 0,
  AZTEC,
  CODABAR,
  CODE_39,
  CODE_93,
  CODE_128,
  DATA_MATRIX,
  MAXICODE,
  ITF,
  EAN_13,
  EAN_8,
  PDF_417,
  RSS_14,
  RSS_EXPANDED,
  UPC_A,
  UPC_E,
  UPC_EAN_EXTENSION,
}

/** Format of detected code. */
class QrcodeResultFormat {
  public readonly format: Html5QrcodeSupportedFormats;
  public readonly formatName: string;
}

/** Detailed scan result. */
interface QrcodeResult {
  /** Decoded text. */
  text: string;

  /** Format that was successfully scanned. */
  format?: QrcodeResultFormat,
}

/** QrCode result object. */
interface Html5QrcodeResult {
  decodedText: string;
  result: QrcodeResult;
}

/** Type for a callback for a successful code scan. */
type QrcodeSuccessCallback
  = (decodedText: string, result: Html5QrcodeResult) => void;

/** Type for a callback for failure during code scan. */
type QrcodeErrorCallback
  = (errorMessage: string, error: Html5QrcodeError) => void;

/**
 * Interface for configuring {@class Html5Qrcode} class instance.
 */
interface Html5QrcodeConfigs {
  /**
   * Array of formats to support of type {@type Html5QrcodeSupportedFormats}.
   */
  formatsToSupport: Array<Html5QrcodeSupportedFormats> | undefined;
}

/** Configuration for creating {@class Html5Qrcode}. */
interface Html5QrcodeFullConfig extends Html5QrcodeConfigs {
  /**
   * If true, all logs would be printed to console. False by default.
   */
  verbose: boolean | undefined;
}

interface Html5QrcodeCameraScanConfig {
  /**
   * Optional, Expected framerate of QR code scanning. example { fps: 2 } means the
   * scanning would be done every 500 ms.
   */
  fps: number | undefined;

  /**
   * Optional, width of scanning region box, this should be smaller than the
   * width and height of the full region.
   * This would make the scanner look like this:
   *          ----------------------
   *          |********************|
   *          |******,,,,,,,,,*****|      <--- shaded region
   *          |******|       |*****|      <--- non shaded region would be
   *          |******|       |*****|          used for QR code scanning.
   *          |******|_______|*****|
   *          |********************|
   *          |********************|
   *          ----------------------
   */
  qrbox?: number | undefined;

  /**
   * Optional, Desired aspect ratio for the video feed. Ideal aspect ratios
   * are 4:3 or 16:9. Passing very wrong aspect ratio could lead to video feed
   * not showing up.
   */
  aspectRatio?: number | undefined;

  /**
   * Optional, if {@code true} flipped QR Code won't be scanned. Only use this
   * if you are sure the camera cannot give mirrored feed if you are facing
   * performance constraints.
   */
  disableFlip?: boolean | undefined;

  /*
   * Optional, @beta(this config is not well supported yet).
   *
   * Important: When passed this will override other parameters like
   * 'cameraIdOrConfig' or configurations like 'aspectRatio'.
   * 'videoConstraints' should be of type {@code MediaTrackConstraints} as
   * defined in
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
   * and is used to specify a variety of video or camera controls like:
   * aspectRatio, facingMode, frameRate, etc.
   */
  videoConstraints?: MediaTrackConstraints | undefined;
}

/**
 * Interface for controlling different aspects of {@class Html5QrcodeScanner}.
 */
interface Html5QrcodeScannerConfig
  extends Html5QrcodeCameraScanConfig, Html5QrcodeConfigs {};

class Html5Qrcode {
  /**
   * Returns a Promise with a list of all cameras supported by the device.
   */
  static getCameras(): Array<CameraDevice> // Returns a Promise

  /**
   * Initialize QR Code scanner.
   *
   * @param elementId - Id of the HTML element.
   * @param verbose - optional configuration object
   */
  constructor(elementId: string, config:  Html5QrcodeFullConfig | undefined) {}

  /**
   * Start scanning QR codes or barcodes for a given camera.
   *
   * @param cameraIdOrConfig Identifier of the camera, it can either be the
   *  camera id retrieved from {@code Html5Qrcode#getCameras()} method or
   *  object with facing mode constraint.
   * @param configuration Extra configurations to tune the code scanner.
   * @param qrCodeSuccessCallback Callback called when an instance of a QR
   * code or any other supported bar code is found.
   * @param qrCodeErrorCallback Callback called in cases where no instance of
   * QR code or any other supported bar code is found.
   */
  start(
    cameraIdOrConfig: Html5QrcodeIdentifier,
    configuration: Html5QrcodeCameraScanConfig | undefined,
    qrCodeSuccessCallback: QrcodeSuccessCallback | undefined,
    qrCodeErrorCallback: QrcodeErrorCallback | undefined,
  ): Promise<null> {}ass

  /**
   * Stops streaming QR Code video and scanning.
   */
  stop(): Promise<void> {}

  /**
   * Scans an Image File for QR Code.
   *
   * This feature is mutually exclusive to camera-based scanning, you should
   * call stop() if the camera-based scanning was ongoing.
   *
   * @param imageFile a local file with Image content.
   * @param showImage if true, the Image will be rendered on given element.
   *
   * @returns Promise with decoded QR code string on success.
   */
  scanFile(
    imageFile: File,
    /* default=true */ showImage: boolean | undefined): Promise<string> {}

  /**
   * Clears the existing canvas.
   *
   * Note: in case of ongoing web-cam based scan, it needs to be explicitly
   * closed before calling this method, else it will throw an exception.
   */
  clear(): void {}  // Returns void
}

class Html5QrcodeScanner {
  /**
   * Creates an instance of this class.
   *
   * @param elementId Id of the HTML element.
   * @param config Extra configurations to tune the code scanner.
   * @param verbose - If true, all logs would be printed to console.
   */
  constructor(
    elementId: string,
    config: Html5QrcodeScannerConfig | undefined,
    verbose: boolean | undefined) {}

  /**
   * Renders the User Interface.
   *
   * @param qrCodeSuccessCallback Callback called when an instance of a QR
   * code or any other supported bar code is found.
   * @param qrCodeErrorCallback optional callback called in cases where no
   * instance of QR code or any other supported bar code is found.
   */
  render(
    qrCodeSuccessCallback: QrcodeSuccessCallback,
    qrCodeErrorCallback: QrcodeErrorCallback | undefined) {}

  /** Removes the QR Code scanner. */
  clear(): Promise<void>  {}
}
