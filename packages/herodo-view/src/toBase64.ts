/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RefObject } from 'react';
import { PIN_CLASSNAMES } from './Pin';

export const toBase64 = (
  svgRef: RefObject<SVGSVGElement>,
  src: string,
  selectedIndex: number | null,
  baseColor: string,
  width: number,
  height: number,
  naturalWidth: number,
  naturalHeight: number
): Promise<string> =>
  new Promise<string>((resolve) => {
    const svg = svgRef.current!;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const image = new Image();

    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
      const svgImage = new Image();
      svgImage.onload = () => {
        ctx.drawImage(svgImage, 0, 0, svgImage.naturalWidth, svgImage.naturalHeight);
        resolve(canvas.toDataURL().replace('data:image/png;base64,', ''));
      };
      svg.setAttribute('width', `${naturalWidth}`);
      svg.setAttribute('height', `${naturalHeight}`);

      if (selectedIndex !== null) {
        (
          svg.getElementsByClassName(PIN_CLASSNAMES.polygon)[selectedIndex] as SVGPathElement
        ).style.fill = '#fff';
        (
          svg.getElementsByClassName(PIN_CLASSNAMES.text)[selectedIndex] as SVGTextElement
        ).style.fill = baseColor;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      svg.setAttribute('width', `${width}`);
      svg.setAttribute('height', `${height}`);

      if (selectedIndex !== null) {
        (
          svg.getElementsByClassName(PIN_CLASSNAMES.polygon)[selectedIndex] as SVGPathElement
        ).style.fill = baseColor;
        (
          svg.getElementsByClassName(PIN_CLASSNAMES.text)[selectedIndex] as SVGTextElement
        ).style.fill = '#fff';
      }
      svgImage.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(svgData)}`;
    };
    image.src = src;
  });
