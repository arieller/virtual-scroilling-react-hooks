This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This implementation of virtual scrolling will show the user only a small portion of data at a given time.

Other items should be emulated (virtualized) via top and bottom padding elements, which are empty but have some height necessary to provide consistent scrollbar parameters.

Each time the user scrolls out of the set of visible items, the content is rebuilt: new items are fetched and rendered, old ones are destroyed, padding elements are recalculated, etc.

Big thanks to [Denis Hilt](https://blog.logrocket.com/virtual-scrolling-core-principles-and-basic-implementation-in-react) for the guide
