import * as React from "react";
import {Html5Qrcode, Html5QrcodeScanner, CameraDevice} from 'html5-qrcode';

interface MyProps {
  fps: any;
  qrbox: any;
  aspectRatio: any;
  disableFlip: any;
  verbose: boolean;
  qrCodeSuccessCallback: () => any;
  qrCodeErrorCallback: () => any;
}

export class Html5QrcodeScannerPlugin extends React.Component<MyProps> {
  private html5QrcodeScanner?: Html5QrcodeScanner;

  componentDidMount() {
    // Creates the configuration object for Html5QrcodeScanner.
    function createConfig(props: MyProps) {
      var config: any = {};
      if (props.fps) {
        config.fps = props.fps;
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
      }
      return config;
    }

    const config = createConfig(this.props);
    const verbose = this.props.verbose === true;

    // Suceess callback is required.
    if (!(this.props.qrCodeSuccessCallback )) {
      throw 'qrCodeSuccessCallback is required callback.';
    }
  }

  componentWillUnmount() {
    if (!this.html5QrcodeScanner) { return; }
    // TODO(mebjas): See if there is a better way to handle
    //  promise in `componentWillUnmount`.
    this.html5QrcodeScanner.clear().catch((error: any) => {
      console.error('Failed to clear html5QrcodeScanner. ', error);
    });
  }

  render() {
    return <div id={'qr-code-full-region'} />;
  }
}
