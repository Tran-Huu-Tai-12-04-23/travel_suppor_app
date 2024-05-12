import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const Skeleton = (props: any) => (
   <ContentLoader speed={1} width={250} height={170} backgroundColor="#c0bfbc" foregroundColor="#ffffff" {...props}>
      <Rect x="0" y="6" rx="0" ry="0" width="250" height="130" />
      <Rect x="0" y="145" rx="5" ry="5" width="250" height="10" />
      <Rect x="0" y="160" rx="5" ry="5" width="250" height="10" />
   </ContentLoader>
);

export default Skeleton;
