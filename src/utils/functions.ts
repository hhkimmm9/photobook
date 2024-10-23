export const convertDate = (dateInString: string | undefined) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  if (dateInString) {
    const date = new Date(dateInString)

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const hours = (date.getHours() % 12) || 12 // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const period = date.getHours() < 12 ? 'AM' : 'PM'
    
    return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`
  }
}

export const timeSince = (date: number) => {
  const seconds = Math.floor((new Date().valueOf() - date) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }

  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }

  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }

  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }

  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }

  return Math.floor(seconds) + ' seconds'
}