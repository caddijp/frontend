# @caddijp/herodo-view

[![NPM version](https://badge.fury.io/js/%40caddijp%2Fherodo-view.svg)](https://badge.fury.io/js/%40caddijp%2Fherodo-view)

Orama-view wrapper for Herodo/SPP

## Install

    npm install @caddijp/herodo-view

## Usage

```typescript
import { HerodoView } from '@caddijp/herodo-view';

export const Viewer = () => (
    <HerodoView
        ref={viewerRef}
        src="/sample.png"
        pins={pins}
        editabled={editabled}
        selectedIndex={selectedIndex}
        onChangePins={setPins}
        onSelectPin={setSelectedindex}
    />
);

```

## License

[MIT](https://github.com/caddijp/frontend/blob/master/LICENSE) © CADDi Co.,Ltd
