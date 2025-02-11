declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

//TODO: Generate types automatically for auto complete in the codebase
// when scss is used in components
