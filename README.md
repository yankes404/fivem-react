# @yankes/fivem-react

## Overview
`@yankes/fivem-react` is a library designed to simplify and speed up the development of FiveM UI solutions using React. It provides a set of hooks and utilities for handling NUI messages, fetching data, and managing UI state.

## Installation
```sh
npm install @yankes/fivem-react
```

or

```sh
yarn add @yankes/fivem-react
```

## Features
- **React Hooks** for handling NUI messages and fetching data
- **Optimized for FiveM** development
- **Supports TypeScript**
- **Lightweight and efficient**

## Usage

### `useDisplay`
Manages UI display state based on NUI messages.
```tsx
import { useDisplay } from "@yankes/fivem-react/hooks";

const MyComponent = () => {
    const isVisible = useDisplay("my-ui");
    return isVisible ? <div>UI is visible</div> : null;
};
```

### `useNuiData`
Fetches and updates data from NUI messages.
```tsx
import { useNuiData } from "@yankes/fivem-react/hooks";

const MyComponent = () => {
    const data = useNuiData("player-stats");
    return <div>Player Stats: {JSON.stringify(data)}</div>;
};
```

### `useNuiFetch`
Fetches data from the server via NUI.
```tsx
import { useNuiFetch } from "@yankes/fivem-react/hooks";

const MyComponent = () => {
    const { isPending } = useNuiFetch("get-player-info", {
        onSuccess: (response) => console.log(response),
        onError: (error) => console.error(error),
    });

    return <div>{isPending ? "Loading..." : "Data fetched!"}</div>;
};
```

### `useNuiMutation`
Performs NUI mutations with transitions.
```tsx
import { useNuiMutation } from "@yankes/fivem-react/hooks";

const MyComponent = () => {
    const { mutate, isPending } = useNuiMutation("update-player", {
        body: { level: 10 },
        onSuccess: () => console.log("Updated!"),
    });

    return <button onClick={mutate} disabled={isPending}>Update Player</button>;
};
```

### `useNuiMessage`
Listens for incoming NUI messages.
```tsx
import { useNuiMessage } from "@yankes/fivem-react/hooks";

useNuiMessage("some-event", (data) => {
    console.log("Received event:", data);
});
```

## Utils
### `fetchNui`
Fetches data from the NUI interface.
```ts
import { fetchNui } from "@yankes/fivem-react/utils";

fetchNui("get-data", { someParam: 123 })
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### `getResourceUrl`
Generates the appropriate URL for fetching resources.
```ts
import { getResourceUrl } from "@yankes/fivem-react/utils";

const url = getResourceUrl("/some-endpoint");
console.log(url);
```

### `isProduction`
Checks if the environment is in production mode.
```ts
import { isProduction } from "@yankes/fivem-react/utils";

if (isProduction()) {
    console.log("Running in production mode");
} else {
    console.log("Running in development mode");
}
```

## Components

### `VisibleElement`
Handles UI visibility with smooth transitions.
```tsx
import { VisibleElement } from "@yankes/fivem-react";

const MyComponent = () => {
    return (
        <VisibleElement key="my-ui" onOpen={() => console.log("Opened")} onClose={() => console.log("Closed")}>
            <div>My Visible UI</div>
        </VisibleElement>
    );
};
```

### `VisibleButton`
A button component that automatically closes the `VisibleElement` when clicked.
```tsx
import { VisibleElement, VisibleButton } from "@yankes/fivem-react";

const MyComponent = () => {
    return (
        <VisibleElement key="my-ui">
            <div>
                My Visible UI
                <VisibleButton>Close</VisibleButton>
            </div>
        </VisibleElement>
    );
};
```

### Repository
[GitHub Repository](https://github.com/yankes404/fivem-react)

### NPM Post
[NPM Post](https://www.npmjs.com/package/@yankes/fivem-react)

## License
This project is licensed under the ISC License.