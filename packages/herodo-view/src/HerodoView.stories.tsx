import { Meta, Story } from '@storybook/react';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import type { HerodoViewHandler, HerodoViewPin, HerodoViewProps } from './HerodoView';
import { HerodoView } from './HerodoView';

const Container = styled.div`
  position: relative;
  height: 90vh;
  background: #1e2f4b;
`;

const EditBtn = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0 4px;
  background: #fff;
`;

const SaveBtn = styled.button`
  position: absolute;
  top: 50px;
  left: 10px;
`;

export default {
  title: 'HerodoView',
  component: HerodoView,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<HerodoViewProps>;

const Template: Story<HerodoViewProps> = () => {
  const [editabled, setEditabled] = useState(true);
  const [selectedIndex, setSelectedindex] = useState<number | null>(null);
  const [pins, setPins] = useState<HerodoViewPin[]>([]);
  const viewerRef = useRef<HerodoViewHandler | null>(null);
  const savePins = useCallback(async () => {
    if (!viewerRef.current) return;

    const a = document.createElement('a');
    a.target = '_brank';
    a.download = 'HerodoView.png';
    a.href = `data:image/png;base64,${await viewerRef.current.toBase64()}`;
    a.click();
  }, []);

  return (
    <Container>
      <HerodoView
        ref={viewerRef}
        src="/sample.png"
        pins={pins}
        editabled={editabled}
        selectedIndex={selectedIndex}
        onChangePins={setPins}
        onSelectPin={setSelectedindex}
      />
      <EditBtn>
        <input
          type="checkbox"
          checked={editabled}
          onChange={(e) => setEditabled(e.target.checked)}
        />
        Edit
      </EditBtn>
      <SaveBtn onClick={savePins}>Save</SaveBtn>
    </Container>
  );
};

export const Basic = Template.bind({});
