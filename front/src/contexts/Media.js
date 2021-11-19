import { createMedia } from "@artsy/fresnel"

const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    sm: 0,
    lg: 1024,
  },
})

export { MediaContextProvider }
export default Media