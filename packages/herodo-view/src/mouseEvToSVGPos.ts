export const mouseEvToSVGPos = (
  svgElem: SVGSVGElement,
  e: { pageX: number; pageY: number }
): DOMPoint => {
  const pt = svgElem.createSVGPoint();
  pt.x = e.pageX;
  pt.y = e.pageY;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pt.matrixTransform(svgElem.getScreenCTM()!.inverse());
};
