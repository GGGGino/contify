import * as React from "react";
import QrScanner from 'qr-scanner';

interface QrcodeScannerProps {
  onQrcodeScanned: (qrCodeScanned: string) => any;
}

export class QrcodeScannerPlugin extends React.Component<QrcodeScannerProps> {
  private qrScanner?: QrScanner;
  private timerId: any;
  private wait?: () => any;

  componentDidMount() {
    setTimeout(() => {
      const videoElem = document.getElementById('qr-video') as HTMLVideoElement;

      this.qrScanner = new QrScanner(videoElem, (result: string) => {
        this.props.onQrcodeScanned(result);
        this.qrScanner!.stop();
      });

      // videoElem.parentNode!.appendChild(((this.qrScanner as any).$canvas) as Node);

      this.qrScanner.start();
    }, 200);
  }

  componentWillUnmount() {
    if (!this.qrScanner) { return; }

    console.log('unoount');

    this.qrScanner.destroy();
  }

  render() {
    return <video id="qr-video" />;
  }

  debounceFn(callback: () => any, delay: number) {
    // Cancels the setTimeout method execution
    clearTimeout(this.timerId);

    // Executes the func after delay time.
    this.timerId = setTimeout(callback, delay);
  }

  debounce(callback: () => any, delay: number) {
    if (this.wait) {
      return;
    }

    this.wait = callback;

    setTimeout(() => {
      console.log('insideTimout');
      this.wait!();
      this.wait = undefined;
    }, delay);
  }
}
