'use client'

import Zoom, { Controlled } from 'react-medium-image-zoom'

const ZoomWrapper: typeof Zoom = (props) => <Zoom {...props} />

export default ZoomWrapper

const ControlledWrapper: typeof Controlled = (props) => <Controlled {...props} />

export { ControlledWrapper as ControlledZoom }
