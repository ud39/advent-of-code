
interface Language {

  id: number,
  language: string,
  logo: string
}


interface Solution {

  id: number
  language_id: number,
  code: string,
  year: number,
  day: number

}

interface InputData {

  data: string,
  year: number,
  day: number
}

export {Language, Solution, InputData}
