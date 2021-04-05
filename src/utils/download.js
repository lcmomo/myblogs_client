
import { baseUrl} from './index.js'
import { getToken } from './index.js'

export default function download(router) {
  const $a = document.createElement('a')
  const token = getToken()
  $a.href = token ? `${baseUrl}${router}?token=${token}` : `${baseUrl}${router}`
  document.body.appendChild($a)
  $a.click()
  document.body.removeChild($a)
}
