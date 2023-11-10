import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
// import Zoom, { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import Zoom, { ControlledZoom } from './Zoom'
import Image from './Image'
import CustomLink from './Link'
import HabitTable from '@/components/tables/HabitTableV2'
import InverseHabitTable from '@/components/tables/InverseHabitTableV2'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  Zoom,
  ControlledZoom,
  HabitTable,
  InverseHabitTable,
}
