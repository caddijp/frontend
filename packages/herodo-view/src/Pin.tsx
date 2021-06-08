import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { mouseEvToSVGPos } from './mouseEvToSVGPos';

export type HerodoViewPin = {
  importedPageId?: string;
  pinDescription?: string;
  origin: { x: number; y: number };
  node: { x: number; y: number; order: number };
};

export const PIN_CLASSNAMES = {
  triangle: 'herodo-view-triangle',
  polygon: 'herodo-view-polygon',
  text: 'herodo-view-text',
};

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
  :hover > .${PIN_CLASSNAMES.triangle} {
    fill: ${(props) => props.highlightedColor} !important;
  }
  :hover > .${PIN_CLASSNAMES.polygon} {
    fill: #fff !important;
  }
  :hover > .${PIN_CLASSNAMES.text} {
    fill: ${(props) => props.highlightedColor} !important;
  }
`;

export const Pin: React.FC<{
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
}> = (props) => {
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
