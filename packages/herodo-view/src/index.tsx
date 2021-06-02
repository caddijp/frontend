/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { mouseEvToSVGPos } from './mouseEvToSVGPos';
import { HerodoViewPin, Pin } from './Pin';
import { toBase64 } from './toBase64';
import { useSize } from './useSize';

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

const TransformContainer = styled.div`
  height: 100%;
  text-align: center;
  transform-origin: left top;
`;

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

const HerodoViewComponent = (props: HerodoViewProps, ref: Ref<HerodoViewHandler>) => {
  const radius = props.radius ?? 80;
  const baseColor = props.baseColor ?? BASE_COLOR;
  const highlightedColor = props.highlightedColor ?? HIGHLIGHT_COLOR;
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height, naturalWidth, naturalHeight } = useSize(props.src, containerRef);
  const [oramaCon, setOramaCon] = useState<ViewContext<OramaContext> | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      toBase64: () =>
        toBase64(
          svgRef,
          props.src,
          props.selectedIndex,
          baseColor,
          width,
          height,
          naturalWidth,
          naturalHeight
        ),
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

  useEffect(() => {
    if (props.selectedIndex !== null && !props.pins[props.selectedIndex]) {
      props.onSelectPin?.(null);
    }
  }, [props.pins, props.selectedIndex, props.onSelectPin]);

  return (
    <Container ref={containerRef}>
      <OramaImageView src={props.src} width={width} height={height} onInit={setOramaCon} />
      <SvgContainer
        onMouseMove={onMouseMove}
        onContextMenu={onContextMenu}
        onMouseDown={onPanStart}
        onWheel={onZoom}
      >
        <TransformContainer
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
                <Pin
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
                  onSelect={() => props.onSelectPin?.(i)}
                />
              ))}
          </svg>
        </TransformContainer>
      </SvgContainer>
    </Container>
  );
};

export const HerodoView = forwardRef(HerodoViewComponent);
export type { HerodoViewPin };
