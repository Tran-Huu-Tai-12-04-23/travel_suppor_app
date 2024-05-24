import React from "react";
import Gif from "react-native-gif";

function GifImage({
  source,
  width = 200,
  height = 200,
}: {
  source: any;
  width?: number;
  height?: number;
}) {
  return <Gif source={source} style={{ width: width, height: height }} />;
}

export default GifImage;
