/* eslint-disable max-lines, @typescript-eslint/no-non-null-assertion */
import { OramaContext, OramaImageView, ViewContext } from '@caddijp/orama-view';
import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

export type HerodoViewPin = {
  importedPageId?: string;
  pinDescription?: string;
  origin: { x: number; y: number };
  node: { x: number; y: number; order: number };
};

const CLASSNAMES = {
  triangle: 'herodo-view-triangle',
  polygon: 'herodo-view-polygon',
  text: 'herodo-view-text',
};

const Container = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const SvgContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
`;

const Transformer = styled.div`
  height: 100%;
  text-align: center;
  transform-origin: left top;
`;

const useSize = (src: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [naturalWidth, setNaturalWidth] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(1);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setNaturalWidth(img.naturalWidth);
      setNaturalHeight(img.naturalHeight);
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    let timeoutId = 0;
    const onResize = () => {
      clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        if (!containerRef.current) return;

        setWidth(containerRef.current.clientWidth);
        setHeight(containerRef.current.clientHeight);
      }, 100);
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return { width, height, naturalWidth, naturalHeight, containerRef };
};

export type HerodoViewHandler = {
  toBase64: () => Promise<string>;
};

export type HerodoViewProps = {
  src: string;
  editabled: boolean;
  pins: HerodoViewPin[];
  selectedIndex: number | null;
  radius?: number;
  baseColor?: string;
  selectedColor?: string;
  highlightedColor?: string;
  onSelectPin?: (index: number | null) => void;
  onChangePins?: (pins: HerodoViewPin[]) => void;
};

const BASE_COLOR = '#1ac2c6';
const HIGHLIGHT_COLOR = '#faad14';
const polygon = `M0,1 ${[...Array(5)]
  .map((_, i) => {
    const rad = (Math.PI / 3) * (i + 2.5);
    return `L${Math.cos(rad)},${Math.sin(rad)}`;
  })
  .join(' ')} Z`;

const StyledG = styled.g<{ editabled: boolean; highlightedColor: string }>`
  cursor: ${(props) => (props.editabled ? 'move' : 'pointer')};
  user-select: none;
  :hover > * {
    stroke: ${(props) => props.highlightedColor} !important;
  }
  :hover > .${CLASSNAMES.triangle} {
    fill: ${(props) => props.highlightedColor} !important;
  }
  :hover > .${CLASSNAMES.polygon} {
    fill: #fff !important;
  }
  :hover > .${CLASSNAMES.text} {
    fill: ${(props) => props.highlightedColor} !important;
  }
`;

const mouseEvToSVGPos = (svgElem: SVGSVGElement, e: { pageX: number; pageY: number }) => {
  const pt = svgElem.createSVGPoint();
  pt.x = e.pageX;
  pt.y = e.pageY;

  return pt.matrixTransform(svgElem.getScreenCTM()!.inverse());
};

const PinComponent = (props: {
  pin: HerodoViewPin;
  svgElem: SVGSVGElement;
  color: string;
  editabled: boolean;
  highlightedColor: string;
  radius: number;
  selected: boolean;
  index: number;
  onChange: (pin: HerodoViewPin) => void;
  onSelect: () => void;
}) => {
  const [movingPin, setMovingPin] = useState<{
    target: 'node' | 'origin';
    basePos: { x: number; y: number };
    pin: HerodoViewPin;
  } | null>(null);
  const onMousedown = useCallback(
    (
      e: React.MouseEvent<SVGPathElement | SVGTextElement | SVGPolylineElement>,
      target: 'node' | 'origin'
    ) => {
      if (e.button !== 0) return;

      e.stopPropagation();
      props.onSelect();

      if (!props.editabled) return;

      const svgP = mouseEvToSVGPos(props.svgElem, e);
      setMovingPin({ target, basePos: { x: svgP.x, y: svgP.y }, pin: props.pin });
    },
    [props.editabled, props.pin]
  );
  const pin = movingPin?.pin ?? props.pin;
  const nodeX = pin.origin.x + pin.node.x;
  const nodeY = pin.origin.y + pin.node.y;

  useEffect(() => {
    if (!movingPin) return;

    const onMousemove = (e: MouseEvent) => {
      const svgP = mouseEvToSVGPos(props.svgElem, e);

      setMovingPin({
        ...movingPin,
        pin: {
          ...props.pin,
          [movingPin.target]: {
            ...props.pin[movingPin.target],
            x: Math.floor(props.pin[movingPin.target].x + (svgP.x - movingPin.basePos.x)),
            y: Math.floor(props.pin[movingPin.target].y + (svgP.y - movingPin.basePos.y)),
          },
        },
      });
    };
    window.addEventListener('mousemove', onMousemove, false);

    return () => window.removeEventListener('mousemove', onMousemove, false);
  }, [movingPin?.target, props.svgElem, props.pin]);

  useEffect(() => {
    if (!movingPin) return;

    const onMouseup = () => {
      props.onChange(movingPin.pin);
      setMovingPin(null);
    };
    window.addEventListener('mouseup', onMouseup, false);

    return () => window.removeEventListener('mouseup', onMouseup, false);
  }, [movingPin?.pin]);

  return (
    <StyledG editabled={props.editabled} highlightedColor={props.highlightedColor}>
      <polyline
        points={`${pin.origin.x},${pin.origin.y} ${nodeX},${nodeY}`}
        stroke={props.color}
        strokeWidth="5"
        fill="none"
        onMouseDown={(e) => onMousedown(e, 'origin')}
      />
      <path
        className="herodo-view-triangle"
        d="M0,0 L50,25 L50,-25 Z"
        transform={`translate(${pin.origin.x},${pin.origin.y}) rotate(${
          (Math.atan2(pin.node.y, pin.node.x) / Math.PI) * 180
        })`}
        stroke={props.color}
        fill={props.color}
        onMouseDown={(e) => onMousedown(e, 'origin')}
      />
      <path
        className="herodo-view-polygon"
        d={polygon}
        transform={`translate(${nodeX},${nodeY}) scale(${props.radius})`}
        stroke={props.color}
        strokeWidth="0.1"
        fill={props.selected ? props.color : '#fff'}
        onMouseDown={(e) => onMousedown(e, 'node')}
      />
      <text
        className="herodo-view-text"
        x={nodeX}
        y={nodeY}
        fontSize={props.radius * 1.2}
        textAnchor="middle"
        dominantBaseline="central"
        stroke="none"
        fill={props.selected ? '#fff' : props.color}
        onMouseDown={(e) => onMousedown(e, 'node')}
      >
        {props.index + 1}
      </text>
    </StyledG>
  );
};

const HerodoViewComponent = (props: HerodoViewProps, ref: Ref<HerodoViewHandler>) => {
  const radius = props.radius ?? 80;
  const baseColor = props.baseColor ?? BASE_COLOR;
  const highlightedColor = props.highlightedColor ?? HIGHLIGHT_COLOR;
  const { width, height, naturalWidth, naturalHeight, containerRef } = useSize(props.src);
  const svgRef = useRef<SVGSVGElement>(null);
  const [oramaCon, setOramaCon] = useState<ViewContext<OramaContext> | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      toBase64: () =>
        new Promise<string>((resolve) => {
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
            svgRef.current!.setAttribute('width', `${naturalWidth}`);
            svgRef.current!.setAttribute('height', `${naturalHeight}`);

            if (props.selectedIndex !== null) {
              (svgRef.current!.getElementsByClassName(CLASSNAMES.polygon)[
                props.selectedIndex
              ] as SVGPathElement).style.fill = '#fff';
              (svgRef.current!.getElementsByClassName(CLASSNAMES.text)[
                props.selectedIndex
              ] as SVGTextElement).style.fill = baseColor;
            }

            const svgData = new XMLSerializer().serializeToString(svgRef.current!);
            svgRef.current!.setAttribute('width', `${width}`);
            svgRef.current!.setAttribute('height', `${height}`);

            if (props.selectedIndex !== null) {
              (svgRef.current!.getElementsByClassName(CLASSNAMES.polygon)[
                props.selectedIndex
              ] as SVGPathElement).style.fill = baseColor;
              (svgRef.current!.getElementsByClassName(CLASSNAMES.text)[
                props.selectedIndex
              ] as SVGTextElement).style.fill = '#fff';
            }
            svgImage.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(svgData)}`;
          };
          image.src = props.src;
        }),
    }),
    [props.src, width, height, naturalWidth, naturalHeight, props.selectedIndex, baseColor]
  );

  const [zoomCenter, setZoomCenter] = useState({ x: 0, y: 0 });
  const [prevPanPoint, setPrevPanPoint] = useState<{ x: number; y: number } | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const transform = useCallback(
    (
      factor: number,
      delta: { translateXDelta: number; translateYDelta: number },
      center: { x: number; y: number }
    ) => {
      const newScale = Math.min(5, Math.max(1, scale / factor));

      setZoomCenter(center);
      setScale(newScale);

      const pinpoint = {
        x: center.x - translate.x + delta.translateXDelta,
        y: center.y - translate.y + delta.translateYDelta,
      };
      const aspect = naturalWidth / naturalHeight;
      const imageWidth = height * aspect * newScale;
      const newTranslate = {
        x: Math.max(
          (width * (newScale - 1) - imageWidth) / 2,
          Math.min(
            (width * (newScale - 1) + imageWidth) / 2,
            (center.x / scale) * newScale - pinpoint.x
          )
        ),
        y: Math.max(
          -height / 2,
          Math.min((height * (2 * newScale - 1)) / 2, (center.y / scale) * newScale - pinpoint.y)
        ),
      };

      setTranslate(newTranslate);

      return { newScale, newTranslate };
    },
    [scale, translate, width, height, naturalWidth, naturalHeight]
  );

  const onPanStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!oramaCon || e.button !== 2) return;

      setPrevPanPoint({ x: e.pageX, y: e.pageY });
    },
    [oramaCon]
  );

  const onZoom = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!svgRef.current || !oramaCon) return;

      const zoomY = (0.1 * Math.abs(e.deltaY)) / 100;
      const factor = e.deltaY < 0 ? 1 / (1 + zoomY) : 1 + zoomY;
      const { left, top } = svgRef.current.parentElement!.parentElement!.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const { newScale } = transform(
        factor,
        { translateXDelta: 0, translateYDelta: 0 },
        { x: x + translate.x, y: y + translate.y }
      );

      oramaCon.obj.glview.camera = oramaCon.obj.glview
        .startCameraOperation(x, y)
        .zoom_by_factor(scale / newScale).camera;
      oramaCon.repaint();
    },
    [oramaCon, scale, translate, transform]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current || e.target !== e.currentTarget || e.button !== 0) return;

      if (!props.editabled) {
        props.onSelectPin?.(null);
        return;
      }

      const svgP = mouseEvToSVGPos(svgRef.current!, e);
      props.onChangePins?.([
        ...props.pins,
        {
          origin: { x: svgP.x, y: svgP.y },
          node: { x: radius * 2, y: -radius * 2, order: props.pins.length + 1 },
        },
      ]);
      props.onSelectPin?.(props.pins.length);
    },
    [props.onSelectPin, props.editabled, props.onChangePins, props.pins, radius, svgRef]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!oramaCon || !prevPanPoint) return;

      const currentPanPoint = { x: e.pageX, y: e.pageY };
      const { newTranslate } = transform(
        1,
        {
          translateXDelta: currentPanPoint.x - prevPanPoint.x,
          translateYDelta: currentPanPoint.y - prevPanPoint.y,
        },
        zoomCenter
      );

      oramaCon.obj.glview.camera = oramaCon.obj.glview
        .startCameraOperation(0, 0)
        .translate(translate.x - newTranslate.x, translate.y - newTranslate.y).camera;
      oramaCon.repaint();

      setPrevPanPoint(currentPanPoint);
    },
    [oramaCon, prevPanPoint, translate, zoomCenter, transform]
  );

  const onContextMenu = useCallback((e: React.MouseEvent) => e.preventDefault(), []);

  useEffect(() => {
    const onMouseup = () => {
      setPrevPanPoint(null);
    };
    window.addEventListener('mouseup', onMouseup, false);

    return () => window.removeEventListener('mouseup', onMouseup, false);
  }, []);

  useEffect(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, [props.src]);

  useEffect(() => {
    oramaCon?.obj.glview.fit();
    setTranslate({ x: 0, y: 0 });
    setScale(1);
  }, [width, height, oramaCon]);

  return (
    <Container ref={containerRef}>
      <OramaImageView src={props.src} width={width} height={height} onInit={setOramaCon} />
      <SvgContainer
        onMouseMove={onMouseMove}
        onContextMenu={onContextMenu}
        onMouseDown={onPanStart}
        onWheel={onZoom}
      >
        <Transformer
          style={{ transform: `translate(${-translate.x}px, ${-translate.y}px) scale(${scale})` }}
        >
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width={(height * naturalWidth) / naturalHeight}
            height={height}
            viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
            fill="none"
            onMouseDown={onMouseDown}
          >
            {svgRef.current &&
              props.pins.map((pin, i) => (
                <PinComponent
                  key={i}
                  svgElem={svgRef.current!}
                  pin={pin}
                  editabled={props.editabled}
                  color={baseColor}
                  highlightedColor={highlightedColor}
                  radius={radius}
                  selected={i === props.selectedIndex}
                  index={i}
                  onChange={(pin) =>
                    props.onChangePins?.(props.pins.map((p, index) => (index === i ? pin : p)))
                  }
                  onSelect={() => props.onSelectPin?.(i === props.selectedIndex ? null : i)}
                />
              ))}
          </svg>
        </Transformer>
      </SvgContainer>
    </Container>
  );
};

export const HerodoView = forwardRef(HerodoViewComponent);
