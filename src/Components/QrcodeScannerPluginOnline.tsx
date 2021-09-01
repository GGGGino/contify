import * as React from "react";
import QrScanner from 'qr-scanner';

interface QrcodeScannerProps {
  onQrcodeScanned: (qrCodeScanned: string) => any;
}

export class QrcodeScannerPluginOnline extends React.Component<QrcodeScannerProps> {
  private qrScanner?: QrScanner;

  componentDidMount() {
    setTimeout(() => {

      // @ts-ignore
      const video: HTMLVideoElement|null = document.getElementById('qr-video');
      const camHasCamera = document.getElementById('cam-has-camera');
      const camList = document.getElementById('cam-list');
      const camHasFlash = document.getElementById('cam-has-flash');
      const flashToggle = document.getElementById('flash-toggle');
      const flashState = document.getElementById('flash-state');
      const camQrResult = document.getElementById('cam-qr-result');
      const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
      const fileSelector = document.getElementById('file-selector');
      const fileQrResult = document.getElementById('file-qr-result');

      const setResult = (label: any, result: any) => {
        label.textContent = result;
        camQrResultTimestamp!.textContent = new Date().toString();
        label.style.color = 'teal';
        clearTimeout(label.highlightTimeout);
        label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
      };

      // ####### Web Cam Scanning #######

      const scanner = new QrScanner(video!, result => setResult(camQrResult, result), error => {
        camQrResult!.textContent = error;
        camQrResult!.style.color = 'inherit';
      });

      const updateFlashAvailability = () => {
        scanner.hasFlash().then(hasFlash => {
          camHasFlash!.textContent = hasFlash.toString();
          flashToggle!.style.display = hasFlash ? 'inline-block' : 'none';
        });
      };

      scanner.start().then(() => {
        updateFlashAvailability();
        // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
        // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
        // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
        // start the scanner earlier.
        QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
          const option = document.createElement('option');
          option.value = camera.id;
          option.text = camera.label;
          // @ts-ignore
          camList!.add(option);
        }));
      });

      // @ts-ignore
      QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);

      // for debugging
      // @ts-ignore
      window.scanner = scanner;

      document.getElementById('show-scan-region')!.addEventListener('change', (e) => {
        const input = e.target;
        // @ts-ignore
        const label = input.parentNode;
        // @ts-ignore
        label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
        // @ts-ignore
        scanner.$canvas.style.display = input.checked ? 'block' : 'none';
      });

      document.getElementById('inversion-mode-select')!.addEventListener('change', event => {
        // @ts-ignore
        scanner.setInversionMode(event.target.value);
      });

      camList!.addEventListener('change', event => {
        // @ts-ignore
        scanner.setCamera(event.target.value).then(updateFlashAvailability);
      });

      flashToggle!.addEventListener('click', () => {
        scanner.toggleFlash().then(() => flashState!.textContent = scanner.isFlashOn() ? 'on' : 'off');
      });

      document.getElementById('start-button')!.addEventListener('click', () => {
        scanner.start();
      });

      document.getElementById('stop-button')!.addEventListener('click', () => {
        scanner.stop();
      });
    }, 200);
  }

  componentWillUnmount() {
    if (!this.qrScanner) { return; }

    console.log('unoount');

    this.qrScanner.destroy();
  }

  render() {
    return<>
      <h1>Scan from WebCam:</h1>
      <div>
        <video id="qr-video" />
        <br/>
        <label>
          <input id="show-scan-region" type="checkbox" />
          {'Show scan region'}
        </label>
      </div>
      <div>
        <select id="inversion-mode-select">
          <option value="original">Scan original (dark QR code on bright background)</option>
          <option value="invert">Scan with inverted colors (bright QR code on dark background)</option>
          <option value="both">Scan both</option>
        </select>
      </div>
      <b>Device has camera: </b>
      <span id="cam-has-camera" />
      <br />
      <div>
        <b>Preferred camera:</b>
        <select id="cam-list">
          <option value="environment" selected>Environment Facing (default)</option>
          <option value="user">User Facing</option>
        </select>
      </div>
      <b>Camera has flash: </b>
      <span id="cam-has-flash" />
      <div>
        <button id="flash-toggle">📸 Flash: <span id="flash-state">off</span></button>
      </div>
      <br />
      <b>Detected QR code: </b>
      <span id="cam-qr-result">None</span>
      <br/>
      <b>Last detected at: </b>
      <span id="cam-qr-result-timestamp"/>
      <br/>
      <button id="start-button">Start</button>
      <button id="stop-button">Stop</button>
    </>;
  }
}
