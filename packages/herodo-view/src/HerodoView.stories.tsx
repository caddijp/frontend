import { Meta, Story } from '@storybook/react';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import type { HerodoViewHandler, HerodoViewPin, HerodoViewProps } from './HerodoView';
import { HerodoView } from './HerodoView';

const EditBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const SaveBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 10px;
`;

export default {
  title: 'HerodoView',
  component: HerodoView,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<HerodoViewProps>;

const Template: Story<HerodoViewProps> = (args) => {
  const [editabled, setEditabled] = useState(false);
  const [selectedIndex, setSelectedindex] = useState<number | null>(null);
  const [pins, setPins] = useState<HerodoViewPin[]>([]);
  const viewerRef = useRef<HerodoViewHandler | null>(null);
  const savePins = useCallback(async () => {
    if (!viewerRef.current) return;

    const a = document.createElement('a');
    a.target = '_brank';
    a.download = 'viewer.png';
    a.href = `data:image/png;base64,${await viewerRef.current.toBase64()}`;
    a.click();
  }, []);

  return (
    <>
      <HerodoView
        ref={viewerRef}
        src={args.src}
        pins={pins}
        editabled={editabled}
        selectedIndex={selectedIndex}
        onChangePins={setPins}
        onSelectPin={setSelectedindex}
      />
      <EditBtn onClick={() => setEditabled((e) => !e)}>Edit</EditBtn>
      <SaveBtn onClick={savePins}>Save</SaveBtn>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  src: 'https://corp.caddi.jp/assets/img/bnr_seminar_sp.png',
  editabled: true,
  pins: [],
  selectedIndex: null,
};
