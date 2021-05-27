import { COL, ROW } from '../Defines.js'
import * as d from '../Defines.js'

const hasHeight = (a) => {
  return (a.height && a.height != 'auto');
}
const hasWidth = (a) => {
  return (a.width && a.width != 'auto');
}

export const createClasses = (a, c) => {

  c += ` aui`;

  /* grow */

  c += ( a.grow ) ? ' aui-grow' : ' aui-no-grow'

  /* width + height */

  if (hasHeight(a)) c += ` aui-use-height`;
  if (hasWidth(a)) c += ` aui-use-width`;

  /* variants */

  if (a.variant) c += ` aui-variant-${a.variant}`;

  /* breakpoint */ 

  if (a.breakpoint) c += ` aui-breakpoint-${a.breakpoint}`;

  /* sub-type */

  c += ` aui-${a.type}`;

  /* label types */

  c += ` ${ (a.label) ? 'aui-label-'+a.label : 'aui-label-above' }`;

  return c;
}

export const createStyles = (a, s) => {

  if (hasHeight(a)) s += `height: ${a.height};flex-basis: ${a.height};`
  if (hasWidth(a)) s += `width: ${a.height};flex-basis: ${a.height};`

  return s;
}

export const valueToHuman = (a) => {

  if (a.type == d.RNG ) return `l${a.value.x.toFixed(2)} h${a.value.y.toFixed(2)}`
  if (a.type == d.AXS ) return `x${a.value.x.toFixed(2)} y${a.value.y.toFixed(2)}`
  if (a.type == d.SLDR ) return `${a.value.toFixed(2)}`
  if (a.type == d.DRP ) {
    try {
      return `${a.options[a.value].name}`
    } catch(e) {
      return ``
    }
  }
  return ``
}