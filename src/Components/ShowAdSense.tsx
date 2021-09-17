import React from "react";
import {Adsense as AdSense} from "@ctrl/react-adsense";

interface ShowAdSenseProps {
  show: boolean
}

export default function ShowAdSense({show = true}: ShowAdSenseProps) {
  if (!show) { return null; }
  return <AdSense
    client='ca-pub-5437738883571201'
    slot='2740252059'
    style={{ display: 'block', height: '90px' }}
    format='horizontal'
    responsive='true'/>;
}
