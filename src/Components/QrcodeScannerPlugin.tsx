import * as React from "react";
import QrScanner from 'qr-scanner';

interface QrcodeScannerProps {
  onQrcodeScanned: (qrCodeScanned: string) => any;
}

export class QrcodeScannerPlugin extends React.Component<QrcodeScannerProps> {
  private qrScanner?: QrScanner;

  componentDidMount() {
    setTimeout(() => {
      const videoElem = document.getElementById('qr-video') as HTMLVideoElement;

      this.qrScanner = new QrScanner(videoElem, (result: string) => {
        this.props.onQrcodeScanned(result);
        // this.qrScanner!.stop();
      });

      this.qrScanner.start();
    }, 200);
  }

  componentWillUnmount() {
    if (!this.qrScanner) { return; }

    this.qrScanner.destroy();
  }

  render() {
    return <video id="qr-video" />;
  }
}
