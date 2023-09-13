import { getCookie, removeCookie, setCookie } from 'tiny-cookie'
import moment from 'moment'
export const convertToLocalDateTime = (input, format) => {
  if (input) {
    let testDateUtc = ''
    if (format) {
      testDateUtc = moment.utc(input, format)
    } else {
      testDateUtc = moment.utc(input)
    }
    let localDate = moment(testDateUtc).local()
    const output = localDate.format(PRODUCT_CLIENT_DATETIME_FORMAT)

    return output
  } else {
    return input
  }
}

export const getStatusBasedColorDesign = (status = 'active') => {
  let borderColor = 'grey'
  if (status === 'Failed') {
    borderColor = 'red'
  } else if (status === 'Passed') {
    borderColor = 'rgb(102, 187, 106)'
  }
  return borderColor
}

export const getOrganizationId = () => {
  const organizationId =
    process.env.NODE_ENV === 'development'
      ? localStorage.getItem('organizationId')
      : getCookie('organizationId')
  return organizationId
}

export const getAccessToken = () => {
  const accessToken =
    process.env.NODE_ENV === 'development'
      ? localStorage.getItem('access_token')
      : getCookie('__Secure-access_token') ||
        getCookie('__Secure-id_token') ||
        localStorage.getItem('access_token')
  return accessToken
}

export const getRefreshToken = () => {
  const refreshToken =
    process.env.NODE_ENV === 'development'
      ? localStorage.getItem('refresh_token')
      : getCookie('refresh_token') || localStorage.getItem('refresh_token')
  return refreshToken
}

export const setRefreshToken = token => {
  savetoCookie('refresh_token', token)
}

export const setAccessToken = token => {
  savetoCookie('access_token', token, '__Secure-')
}

const savetoCookie = (name, value, prefix = '') => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem(name, value)
  } else {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    const options = {
      secure: true,
      expires: date,
      domain: getDomain(),
    }
    setCookie(`${prefix}${name}`, value, options)
  }
}

export const getSelectedOrginaztion = () => {
  if (process.env.NODE_ENV === 'development') {
    return localStorage.getItem('selected_orginization')
  }
  return getCookie('selected_orginization')
}

export const setSelectedOrginaztion = value => {
  savetoCookie('selected_orginization', value)
}

export const deleteSelectedOrginzation = name => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.removeItem(name)
  } else {
    removeCookie(name)
  }
}

const getDomain = () => {
  try {
    // eslint-disable-next-line
    if (TOKEN_DOMAIN != null) {
      // eslint-disable-next-line
      const tokenDomain = new URL(TOKEN_DOMAIN).host

      if (window.location.host.includes(tokenDomain)) {
        return tokenDomain
      }
    }
  } catch (e) {
    return window.location.host
  }

  return window.location.host
}

export const decodeKeyValue = dataKeyObj => {
  let decodedKeys = {}
  Object.keys(dataKeyObj || {}).forEach(key => {
    const decodedKey = decodeURI((dataKeyObj[key] || '').replace(/%2F/g, '/'))
    Object.assign(decodedKeys, { [key]: decodedKey })
  })
  return decodedKeys
}

export const  guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
