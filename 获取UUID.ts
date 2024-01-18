import { last } from 'lodash'
/**
 * 获取 UUID
 * @example
 * getUUID() // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
const getUUID = () => {
  const tempURL = URL.createObjectURL(new Blob())
  const uuid = tempURL.toString()
  URL.revokeObjectURL(tempURL)
  return last(uuid.split('/'))
}

export default getUUID
