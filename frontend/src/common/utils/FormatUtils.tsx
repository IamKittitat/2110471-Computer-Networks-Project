export const formatDateTime = (isoDateTimeString: string) => {
  const date = new Date(isoDateTimeString)

  // Format date as "dd/mm/yyyy"
  const day = date.getUTCDate().toString().padStart(2, "0")
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
  const year = date.getUTCFullYear().toString()
  const formattedDate = `${day}/${month}/${year}`

  // Format time as "HH.MM"
  const hours = date.getUTCHours().toString().padStart(2, "0")
  const minutes = date.getUTCMinutes().toString().padStart(2, "0")
  const formattedTime = `${hours}.${minutes}`

  return [formattedDate, formattedTime]
}

const addTimes = (date: Date, minutes: number, hours: number) => {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + minutes)
  result.setHours(result.getHours() + hours)
  return result
}

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0")
}

export const showFullDate = (date: Date) => {
  date = addTimes(date, 0, 7)
  return (
    padTo2Digits(date.getDate()) +
    "/" +
    padTo2Digits(date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  )
}

export const showTime = (date: Date, duration: number) => {
  date = addTimes(date, duration, 7)
  return padTo2Digits(date.getHours()) + "." + padTo2Digits(date.getMinutes())
}
